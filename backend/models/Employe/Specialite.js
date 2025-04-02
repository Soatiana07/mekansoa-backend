const mongoose = require('mongoose');

const SpecialiteSchema = new mongoose.Schema({
    nomSpecialite: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model('Specialite', SpecialiteSchema);