const mongoose = require('mongoose');

const EmployeSchema = new mongoose.Schema({
    dateEntree: { type: Date, required: true },
    idRole: { type: mongoose.Schema.Types.ObjectId,ref: 'Role' , required: true },
    nom: {type: String, required: true},
    dateNaissance: { type: Date, required: true },
    cin: {type: String, required: true},
    sexe: {type: String, required: true},
    telephone: {type: String, required: true},
    email: {type: String, required: true},
    adresse: {type: String, required: true},
    salaireBrut: {type: Number, required: true},
    salaireNet: {type: Number, required: true},
    mdp: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model('Employe', EmployeSchema);