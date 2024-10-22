const mongoose = require('mongoose');

const repairShopSchema = new mongoose.Schema({
    title: { type: String, required: true },
    details: { type: String, required: true },
    location: { type: Array, required: true },
});

module.exports = mongoose.model('RepairShop', repairShopSchema);
