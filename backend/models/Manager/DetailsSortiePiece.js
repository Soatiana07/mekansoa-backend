const mongoose = require('mongoose');
const DetailsSortiePieceSchema = new mongoose.Schema({
    idSortiePiece:{ type: mongoose.Schema.Types.ObjectId,ref: 'SortiePiece'},
    idPiece: { type: mongoose.Schema.Types.ObjectId,ref: 'Piece', required: true},
    qte: { type: Number, required: true},
    prixVente: { type: Number, required: true}
});
module.exports = mongoose.model('DetailsSortiePiece', DetailsSortiePieceSchema);