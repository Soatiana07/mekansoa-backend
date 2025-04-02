const mongoose = require('mongoose');

const ModeleVoitureSchema = new mongoose.Schema({
    modele: {type: String, required: true},
    note: { type: Number, required: true }
}, {timestamps: true}); 

module.exports = mongoose.model('ModeleVoiture', ModeleVoitureSchema);