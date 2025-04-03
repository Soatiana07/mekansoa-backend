const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const ManagerTokenSchema = new mongoose.Schema({
    idManager: { type: mongoose.Schema.Types.ObjectId,ref: 'Employe' , required: true },
    tokenManager: { type: String, required: true },
    dateExpiration: {type: Date, required: true}
});

// getManagerTokenByValue
ManagerTokenSchema.statics.getManagerTokenByValue = async function (tokenManager){
    const managerToken = await this.findOne({tokenManager : tokenManager});
    return managerToken;
};

// Generer token
ManagerTokenSchema.statics.generateToken = async function (manager) {
    try {
        const payload = { idManager: manager._id, email: manager.email };
        const secretKey = process.env.JWT_SECRET || 'mekansoa'; 
        const token = jwt.sign(payload, secretKey, { expiresIn: '1m' });

        const dateExpiration = new Date();
        dateExpiration.setSeconds(dateExpiration.getSeconds() + 1 * 60); 

        // Save
        const managerToken = new this({
            idManager: manager._id,
            tokenManager: token,
            dateExpiration: dateExpiration
        });
        await managerToken.save();
        return token;
    } catch (error) {
        throw new Error('Erreur lors de la génération du token : ' + error.message);
    }
};

// Get Valid token by idManager
ManagerTokenSchema.statics.getValidTokenById = async function (idManager){
    // dateExpiration > now -> token valide
    const listemanagerToken = await this.find({idManager:idManager, dateExpiration : { $gt: new Date() }});
    return listemanagerToken;
}

// Logout
ManagerTokenSchema.statics.logout = async function(managerToken) {
    try {
        const managerTokeny = await this.findOne({idManager: managerToken[0]?.idManager}); 
        console.log(managerTokeny);

        if (!managerTokeny) {
            throw new Error("Token introuvable");
        }

        managerTokeny.dateExpiration = new Date(); 
        await managerTokeny.save(); 

        return managerTokeny;
    } catch (error) {
        throw new Error("Erreur lors de la déconnexion : " + error.message);
    }
};


// Check token : appel de getManagerTokenByValue


// Unvalid old token
ManagerTokenSchema.statics.unvalidOldToken = async function (idManager) {
    try {
        const result = await this.updateMany(
            { idManager },
            // Unvalid 
            { $set: { dateExpiration: new Date() } } 
        );

        if (result.nModified === 0) {
            throw new Error("Aucun token trouvé pour ce manager ou aucun changement effectué.");
        }

        return { message: "La date d'expiration du token a été mise à jour avec succès pour ce manager." };
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour du token : " + error.message);
    }
}
module.exports = mongoose.model('managerToken', ManagerTokenSchema);