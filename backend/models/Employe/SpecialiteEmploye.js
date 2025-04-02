const mongoose = require('mongoose');

const SpecialiteEmployeSchema = new mongoose.Schema({
    idEmploye: { type: mongoose.Schema.Types.ObjectId,ref: 'Employe' , required: true },
    idSpecialite: { type: mongoose.Schema.Types.ObjectId,ref: 'Specialite' , required: true },
}, {timestamps: true});

module.exports = mongoose.model('SpecialiteEmploye', SpecialiteEmployeSchema);