const mongoose = require('mongoose');
const EntreePieceSchema = new mongoose.Schema({
    dateEntree: { type: Date, required: true },
    fournisseur: { type: mongoose.Schema.Types.ObjectId, ref: 'Fournisseur' },
    numeroBl: { type: String, required: true },
    commentaire: { type: String}
});
module.exports = mongoose.model('EntreePiece', EntreePieceSchema);