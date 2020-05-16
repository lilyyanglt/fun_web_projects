const mongoose = require('mongoose');

// this tempUser should have the exact same id as the documents in the User's collection
const TempUserSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 300
  }
})

const TempUser = mongoose.model("TempUser", TempUserSchema);

module.exports = TempUser;