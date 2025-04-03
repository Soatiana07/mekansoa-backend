const mongoose = require('mongoose');
const FactureSchema = new mongoose.Schema({
    dateFacturation: { type: Date, required: true},
    idDemandeDevis: { type: mongoose.Schema.Types.ObjectId, ref: 'DemandeDevis' },
    idModePaiement: { type: mongoose.Schema.Types.ObjectId, ref: 'ModePaiement' },
    numeroFacture: { type: String, unique: true }  
});
FactureSchema.pre('save', async function (next) {
    if (!this.numeroFacture) {
        const dernierDevis = await mongoose.model('Facture').findOne().sort({ _id: -1 });
        const dernierNumero = dernierDevis ? parseInt(dernierDevis.numeroFacture.split('_')[1]) : 0;
        this.numeroFacture = `FACT_${dernierNumero + 1}`;
    }
    next();
});

module.exports = mongoose.model('Facture', FactureSchema);