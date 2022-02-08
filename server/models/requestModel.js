const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/three_eleven'

mongoose.connect(url);

const WorkOrderSchema = new mongoose.Schema({
  description: {type: String, required: true},
  status: { type: String, default: 'Unassigned' },
  type: { type: String, default: 'Request' },
  dateRequested: { type: Date, default: Date.now },
  addlInfo: String,
  dispatched: { type: Boolean, default: false },
  photos: [],
  location: {
    latitude: Number,
    longitude: Number
  },
  personalDetails: {
    firstName: String,
    lastName: String,
    phone: String,
    email: {type: String}
  }
})

const WorkOrder = mongoose.model('WorkOrder', WorkOrderSchema);

module.exports = WorkOrder;