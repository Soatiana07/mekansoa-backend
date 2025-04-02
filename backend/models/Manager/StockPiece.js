const mongoose = require('mongoose');

const StockPieceSchema = new mongoose.Schema({
    idPiece: { type: mongoose.Schema.Types.ObjectId, ref: 'Piece' },
    qte: { type: Number, required: true },
    prixUnitaire: { type: Number, required: true },
    margeBeneficiaire: { type: Number}
}, {timestamps: true});

module.exports = mongoose.model('StockPiece', StockPieceSchema);