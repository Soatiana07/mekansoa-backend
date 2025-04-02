const mongoose = require('mongoose');
const DetailsDemandeDevisSchema = new mongoose.Schema({
    idDemandeDevis: { type: mongoose.Schema.Types.ObjectId, ref: 'DemandeDevis' },
    idService: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    idPiece: { type: mongoose.Schema.Types.ObjectId, ref: 'Piece' },
    qte: { type: Number },
    prixUnitairePiece: { type: Number },
    prixBaseService: { type: Number },
    prixServiceSurPlus: { type: Number}
});
module.exports = mongoose.model('DetailsDemandeDevis', DetailsDemandeDevisSchema);