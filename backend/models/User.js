const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  lastAiCall: { type: Date, required: true },
});

module.exports = mongoose.model('User', userSchema);
