const mongoose = require('mongoose');
const DemandeDevisSchema = new mongoose.Schema({
    dateDemandeDevis: { type: Date, required: true},
    idVoitureClient: { type: mongoose.Schema.Types.ObjectId, ref: 'VoitureClient' },
    heureFini: {type: String, default: "00"},
    minuteFini: {type: String, default: "00"},
    isDomicile: {type: Number, required: true},
    frais: { type: Number},
    etat: {type: Number},
    numeroDevis: { type: String, unique: true }  
});

DemandeDevisSchema.pre('save', async function (next) {
    if (!this.numeroDevis) {
        const dernierDevis = await mongoose.model('DemandeDevis').findOne().sort({ _id: -1 });
        const dernierNumero = dernierDevis ? parseInt(dernierDevis.numeroDevis.split('_')[1]) : 0;
        this.numeroDevis = `DEVIS_${dernierNumero + 1}`;
    }
    next();
});

module.exports = mongoose.model('DemandeDevis', DemandeDevisSchema);