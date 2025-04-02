const mongoose = require('mongoose');
const ModePaiementSchema = new mongoose.Schema({
    nomMode: { type: String, required: true }
});
module.exports = mongoose.model('ModePaiement', ModePaiementSchema);