const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    idCategorie: { type: mongoose.Schema.Types.ObjectId,ref: 'CategorieService' , required: true },
    nomService: {type: String, required: true},
    prixBase: { type: Number, required: true },
    isDomicile: {type: Number, required: true}
}, {timestamps: true});

module.exports = mongoose.model('Service', ServiceSchema);