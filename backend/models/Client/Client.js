const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ClientSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    adresse: { type: String },
    telephone: { type: String , required: true},
    email: { type: String , required: true},
    mdp: { type: String, required: true}
});

// findByEmailAndMdp
ClientSchema.statics.findByEmailAndMdp = async function (email, mdp) {
    const client = await this.findOne({ email });
    
    if (!client || !(await bcrypt.compare(mdp, client.mdp))) {
        throw new Error('Email ou mot de passe incorrect'); 
    }
    console.log("Client obtenu par email et mdp :", client);
    return client; 
}

// Avant d'enregistrer un client, cryptage mot de passe
ClientSchema.pre('save', async function (next) {
    if (this.isModified('mdp')) {
      this.mdp = await bcrypt.hash(this.mdp, 10); 
    }
    next();
});
module.exports = mongoose.model('Client', ClientSchema);