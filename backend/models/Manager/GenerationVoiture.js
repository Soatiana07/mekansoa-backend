const mongoose = require('mongoose');

const GenerationVoitureSchema = new mongoose.Schema({
    generation: {type: String, required: true},
    note: { type: Number, required: true }
}, {timestamps: true});

module.exports = mongoose.model('GenerationVoiture', GenerationVoitureSchema);