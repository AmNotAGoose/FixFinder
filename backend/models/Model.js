const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Model', modelSchema);
