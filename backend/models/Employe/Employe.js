const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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


// Login (findByEmailAndMdp)
EmployeSchema.statics.findByEmailAndMdp = async function (email, mdp) {
    const employe = await this.findOne({ email });
    
    if (!employe || !(await bcrypt.compare(mdp, employe.mdp))) {
        throw new Error('Email ou mot de passe incorrect'); 
    }
    console.log("employe obtenu par email et mdp :", employe);
    return employe; 
}

// Avant d'enregistrer un employe, cryptage mot de passe
EmployeSchema.pre('save', async function (next) {
    if (this.isModified('mdp')) {
      this.mdp = await bcrypt.hash(this.mdp, 10); 
    }
    next();
});
module.exports = mongoose.model('Employe', EmployeSchema);