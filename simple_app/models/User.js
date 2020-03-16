const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },

  reminderList: {
    type: Object,
    default: []
  }

});

const User = mongoose.model('User', UserSchema);


module.exports = User;