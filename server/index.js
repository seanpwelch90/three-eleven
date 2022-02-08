//Load libraries and middleware
const express = require('express');
const cors = require('cors');
const compression = require('compression');

//Define App
const app = express();

//Import Routers
const workOrderRouter = require('./controller/workOrderRouter');

//Define App Settings
const port = process.env.port || 5001;

//Use middleware
app.use(compression());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/favicon.ico', (req, res) => res.status(204));

//Use Routers
app.use('/', workOrderRouter);

app.listen(port, (err) => {
  err ?
  console.log(err) :
  console.log(`Running http server on port ${port}`);
});
