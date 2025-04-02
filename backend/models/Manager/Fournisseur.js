const mongoose = require('mongoose');
const FournisseurSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    siteweb: { type: String },
    adresse: { type: String, required: true },
    pays:  { type: mongoose.Schema.Types.ObjectId,ref: 'Pays' , required: true },
    telephone: { type: String, required: true },
    mail: { type: String, required: true },
    etat: { type: Number, required: true }
});
module.exports = mongoose.model('Fournisseur', FournisseurSchema);