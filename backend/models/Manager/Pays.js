const mongoose = require('mongoose');
const PaysSchema = new mongoose.Schema({
    nom_fr_fr: { type: String, required: true }
});
module.exports = mongoose.model('Pays', PaysSchema);