const mongoose = require('mongoose');

const PlanningEmployeSchema = new mongoose.Schema({
    dateDebut: {type: Date, required: true}, 
    deadline: { type: Date, required: true },
    dateFin: { type: Date },
    idDevis: { type: mongoose.Schema.Types.ObjectId,ref: 'DemandeDevis' , required: true },
    idEmploye: { type: mongoose.Schema.Types.ObjectId,ref: 'Employe' , required: true },
    etat: { type: Number, required: true },
    numeroTache: { type: String, unique: true }  ,
    dateDebutTache: {type: Date}, 
    dateFinTache: {type: Date}, 
}, {timestamps: true}); 

// auto incrementation numero tache
PlanningEmployeSchema.pre('save', async function (next) {
    if (!this.numeroTache) {
        const dernierDevis = await mongoose.model('PlanningEmploye').findOne().sort({ _id: -1 });
        const dernierNumero = dernierDevis ? parseInt(dernierDevis.numeroTache.split('_')[1]) : 0;
        this.numeroTache = `TACHE_${dernierNumero + 1}`;
    }
    next();
});

module.exports = mongoose.model('PlanningEmploye', PlanningEmployeSchema);