const mongoose = require('mongoose');
const DetailsEntreePieceSchema = new mongoose.Schema({
    idEntreePiece: { type: mongoose.Schema.Types.ObjectId,ref: 'EntreePiece' , required: true },
    idPiece: { type: mongoose.Schema.Types.ObjectId,ref: 'Piece' , required: true },
    prixUnitaire: { type: Number, required: true },
    qte: { type: Number, required: true },
    dateExpiration: { type: Date},
    margeBeneficiaire: { type: Number, required: true }
});
module.exports = mongoose.model('DetailsEntreePiece', DetailsEntreePieceSchema); 