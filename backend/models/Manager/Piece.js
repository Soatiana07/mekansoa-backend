const mongoose = require('mongoose');
const PieceSchema = new mongoose.Schema({
    nomPiece: { type: String, required: true },
    referencePiece: { type: String, required: true },
    typePiece: { type: String, required: true }
});
module.exports = mongoose.model('Piece', PieceSchema);