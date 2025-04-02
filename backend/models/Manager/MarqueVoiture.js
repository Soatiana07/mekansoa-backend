const mongoose = require('mongoose');
const MarqueVoitureSchema = new mongoose.Schema({
    marque: { type: String, required: true },
    note: { type: Number, required: true }
});
module.exports = mongoose.model('MarqueVoiture', MarqueVoitureSchema);