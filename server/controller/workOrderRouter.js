const express = require('express');
const workOrderRouter = express.Router();
const WorkOrder = require('../models/requestModel');
let wsPort = 5002;
const upload = require('../models/photoUploads');

const { WebSocket, WebSocketServer } = require('ws');

const wss = new WebSocketServer({
  port: wsPort,
});

console.log(`Running websocket server on port ${wsPort}`);

wss.on('connection', connection = (ws) => {
  ws.on('message', message = (data) => {
    console.log('received: %s', data);
  });
});

workOrderRouter.post('/image', upload.single('image'), async (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  res.send();
});

workOrderRouter.post('/wo', upload.single('image'), async (req, res) => {
  console.log(req.body);
  console.log(req.file.location);

  let workOrder = req.body;
  workOrder.location = JSON.parse(workOrder.location);
  workOrder.status = '';
  workOrder.photos = [];
  workOrder.photos[0] = req.file.location;
  WorkOrder.create(workOrder, (err, data) => {
    err ?
      res.send(err) :
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(workOrder));
        }
      });
      res.send(data);
  })
});

workOrderRouter.post('/update/:id', async (req, res) => {

  let id = req.params.id;
  let update = req.body;

  WorkOrder.findOneAndUpdate({_id: id}, update, (err, data) => {
    err ?
      res.send(err) :
      res.send(data);
  })
});

workOrderRouter.get('/wo/:id', (req, res) => {
  WorkOrder.find({ status: { $ne: 'completed' } }).exec((err, data) => {
    console.log(data);
  });
});

workOrderRouter.get('/wo', (req, res) => {
  WorkOrder.find({ status: { $ne: 'completed' } }).exec((err, data) => {
    res.send(data);
  });
});

workOrderRouter.get('/:hello', (req, res) => {
  let hello = req.params.hello;

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(hello);
    }
  })
  res.send(hello);
});

module.exports = workOrderRouter;