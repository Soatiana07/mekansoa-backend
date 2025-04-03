const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const ClientTokenSchema = new mongoose.Schema({
    idClient: { type: mongoose.Schema.Types.ObjectId,ref: 'Client' , required: true },
    tokenClient: { type: String, required: true },
    dateExpiration: {type: Date, required: true}
});

// getClientTokenByValue
ClientTokenSchema.statics.getClientTokenByValue = async function (tokenClient){
    const clientToken = await this.findOne({tokenClient : tokenClient});
    return clientToken;
};

// Generer token
ClientTokenSchema.statics.generateToken = async function (client) {
    try {
        const payload = { idClient: client._id, email: client.email };
        const secretKey = process.env.JWT_SECRET || 'mekansoa'; 
        const token = jwt.sign(payload, secretKey, { expiresIn: '1m' });

        const dateExpiration = new Date();
        dateExpiration.setSeconds(dateExpiration.getSeconds() + 1 * 60); 

        // Save
        const clientToken = new this({
            idClient: client._id,
            tokenClient: token,
            dateExpiration: dateExpiration
        });
        await clientToken.save();
        return token;
    } catch (error) {
        throw new Error('Erreur lors de la génération du token : ' + error.message);
    }
};

// Get Valid token by idClient
ClientTokenSchema.statics.getValdiTokenById = async function (idClient){
    // dateExpiration > now -> token valide
    const listeClientToken = await this.find({idClient:idClient, dateExpiration : { $gt: new Date() }});
    return listeClientToken;
}

// Logout
ClientTokenSchema.statics.logout = async function(clientToken) {
    try {
        const clientTokeny = await this.findOne({idClient: clientToken[0]?.idClient}); // Rechercher l'objet dans la base
        console.log(clientTokeny);

        if (!clientTokeny) {
            throw new Error("Token introuvable");
        }

        clientTokeny.dateExpiration = new Date(); // Mettre à jour la date d'expiration
        await clientTokeny.save(); // 🔥 Enregistrer les modifications

        return clientTokeny;
    } catch (error) {
        throw new Error("Erreur lors de la déconnexion : " + error.message);
    }
};


// Check token : appel de getClientTokenByValue


// Unvalid old token
ClientTokenSchema.statics.unvalidOldToken = async function (idClient) {
    try {
        const result = await this.updateMany(
            { idClient },
            // Unvalid 
            { $set: { dateExpiration: new Date() } } 
        );

        if (result.nModified === 0) {
            throw new Error("Aucun token trouvé pour ce client ou aucun changement effectué.");
        }

        return { message: "La date d'expiration du token a été mise à jour avec succès pour ce client." };
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour du token : " + error.message);
    }
}
module.exports = mongoose.model('ClientToken', ClientTokenSchema);