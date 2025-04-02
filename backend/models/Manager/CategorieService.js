const mongoose = require('mongoose');

const CategorieServiceSchema = new mongoose.Schema({
    nomCategorie: {type: String, required: true},
    imageCategorie : {type: String, required: true},
    description: {type: String}
}, {timestamps: true});

module.exports = mongoose.model('CategorieService', CategorieServiceSchema);