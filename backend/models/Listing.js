const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    uuid: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    user: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
});

module.exports = mongoose.model('Listing', listingSchema);
