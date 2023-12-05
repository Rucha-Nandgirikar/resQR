const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  fullName : {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  dateOfBirth: {
    type: String
  },
  bloodGroup: {
    type: String
  },
  gender: {
    type: String
  },
  vin: {
    type: String,
  }
})

const User = mongoose.model('users', UserSchema);

module.exports = User;