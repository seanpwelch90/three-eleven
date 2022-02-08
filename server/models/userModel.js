const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/three_eleven'

mongoose.connect(url);

const UserSchema = new mongoose.Schema({
  username: {type: String, index: true, unique: true},
  firstName: String,
  lastName: String,
  phone: String,
  email: {type: String, unique: true},
})

const User = mongoose.model('User', UserSchema);

module.exports = User;