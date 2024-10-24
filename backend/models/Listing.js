const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    user: { type: String, required: true },
    title: { type: String, required: true },
    details: { type: String, required: true },
    location: { type: Array, required: true },
});

module.exports = mongoose.model('Listing', listingSchema);
