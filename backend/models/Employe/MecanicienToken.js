const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const MecanicienTokenSchema = new mongoose.Schema({
    idMecanicien: { type: mongoose.Schema.Types.ObjectId,ref: 'Employe' , required: true },
    tokenMecanicien: { type: String, required: true },
    dateExpiration: {type: Date, required: true}
});

// getMecanicienTokenByValue
MecanicienTokenSchema.statics.getMecanicienTokenByValue = async function (tokenMecanicien){
    const employeToken = await this.findOne({tokenMecanicien : tokenMecanicien});
    return employeToken;
};

// Generer token
MecanicienTokenSchema.statics.generateToken = async function (mecanicien) {
    try {
        const payload = { idMecanicien: mecanicien._id, email: mecanicien.email };
        const secretKey = process.env.JWT_SECRET || 'mekansoa'; 
        const token = jwt.sign(payload, secretKey, { expiresIn: '1m' });

        const dateExpiration = new Date();
        dateExpiration.setSeconds(dateExpiration.getSeconds() + 1 * 60); 

        // Save
        const employeToken = new this({
            idMecanicien: mecanicien._id,
            tokenMecanicien: token,
            dateExpiration: dateExpiration
        });
        await employeToken.save();
        return token;
    } catch (error) {
        throw new Error('Erreur lors de la génération du token : ' + error.message);
    }
};

// Get Valid token by idMecanicien
MecanicienTokenSchema.statics.getValdiTokenById = async function (idMecanicien){
    // dateExpiration > now -> token valide
    const listeemployeToken = await this.find({idMecanicien:idMecanicien, dateExpiration : { $gt: new Date() }});
    return listeemployeToken;
}

// Logout
MecanicienTokenSchema.statics.logout = async function(employeToken) {
    try {
        const employeTokeny = await this.findOne({idMecanicien: employeToken[0]?.idMecanicien}); 
        console.log(employeTokeny);

        if (!employeTokeny) {
            throw new Error("Token introuvable");
        }

        employeTokeny.dateExpiration = new Date(); 
        await employeTokeny.save(); 

        return employeTokeny;
    } catch (error) {
        throw new Error("Erreur lors de la déconnexion : " + error.message);
    }
};


// Check token : appel de getMecanicienTokenByValue


// Unvalid old token
MecanicienTokenSchema.statics.unvalidOldToken = async function (idMecanicien) {
    try {
        const result = await this.updateMany(
            { idMecanicien },
            // Unvalid 
            { $set: { dateExpiration: new Date() } } 
        );

        if (result.nModified === 0) {
            throw new Error("Aucun token trouvé pour ce mecanicien ou aucun changement effectué.");
        }

        return { message: "La date d'expiration du token a été mise à jour avec succès pour ce mecanicien." };
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour du token : " + error.message);
    }
}

module.exports = mongoose.model('mecanicienToken', MecanicienTokenSchema);