const mongoose = require('mongoose');

const HistoriquePrixServiceSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    idService: { type: mongoose.Schema.Types.ObjectId,ref: 'Service' , required: true },
    prix: { type: Number, required: true }
}, {timestamps: true});

module.exports = mongoose.model('HistoriquePrixService', HistoriquePrixServiceSchema);