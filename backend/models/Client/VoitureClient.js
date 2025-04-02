const mongoose = require('mongoose');
const VoitureClientSchema = new mongoose.Schema({
    idClient: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    idAnnee: { type: mongoose.Schema.Types.ObjectId, ref: 'AnneeVoiture' },
    idGeneration: { type: mongoose.Schema.Types.ObjectId, ref: 'GenerationVoiture' },
    idMarque: { type: mongoose.Schema.Types.ObjectId, ref: 'MarqueVoiture' },
    idModele: { type: mongoose.Schema.Types.ObjectId, ref: 'ModeleVoiture' },
    numeroService: { type: String}
});
module.exports = mongoose.model('VoitureClient', VoitureClientSchema);