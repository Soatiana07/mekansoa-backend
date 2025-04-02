const mongoose = require('mongoose');

const PlanningEmployeSchema = new mongoose.Schema({
    dateDebut: {type: Date, required: true},
    deadline: { type: Date, required: true },
    dateFin: { type: Date, required: true },
    idDevis: { type: mongoose.Schema.Types.ObjectId,ref: 'DemandeDevis' , required: true },
    idEmploye: { type: mongoose.Schema.Types.ObjectId,ref: 'Employe' , required: true },
    etat: { type: Number, required: true }
}, {timestamps: true}); 

module.exports = mongoose.model('PlanningEmploye', PlanningEmployeSchema);