const express = require('express');
const Employe = require('../models/Employe/Employe');
const MecanicienToken = require('../models/Employe/MecanicienToken');
const router = express.Router();

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, mdp } = req.body;
        // console.log(req.body);

        if (!email || !mdp) {
            return res.status(400).json({ error: "L'email et le mot de passe sont requis." });
        }
        const mecanicien = await Employe.findByEmailAndMdp(email, mdp);
        if (!mecanicien) {
            return res.status(401).json({ error: "Email ou mot de passe incorrect." });
        }
        const token = await MecanicienToken.generateToken(mecanicien);
        res.json({ token, mecanicien });

    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

  
// getMecanicienTokenByValue
router.post('/tokenByValue', async (req, res) => {
    try {
        const { tokenMecanicien } = req.body;
        if (!tokenMecanicien) {
            return res.status(400).json({ message: 'TokenMecanicien manquant' });
        }
        const mecanicienToken = await MecanicienToken.getMecanicienTokenByValue(tokenMecanicien);

        if (!mecanicienToken) {
            return res.status(404).json({ message: 'mecanicienToken non trouvé' });
        }
        res.json(mecanicienToken);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Logout
router.post('/logout', async (req, res) => {
    try {
        console.log(req.body);
        const idMecanicien = await MecanicienToken.find({tokenMecanicien : req.body.params.tokenMecanicien});
        const validTokens = await MecanicienToken.getValdiTokenById(idMecanicien[0]?.idMecanicien);
        console.log("Valiiid :", validTokens);
        if(!validTokens){
            return res.status(401).json({ message: 'Token Introuvable' });
        }
        else{
            const mecanicienTokenRes = await MecanicienToken.logout(validTokens);
            res.json(mecanicienTokenRes);
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// tester getValidTokenById
router.get('/validTokens', async (req, res) => {
    try {
        const { idMecanicien } = req.body;
        const tokens = await MecanicienToken.getValidTokenById(idMecanicien);
        
        res.json(tokens);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des tokens : " + error.message });
    }
});

// Check token
router.get('/checkToken', async (req, res) => {
    try {
        const { tokenMecanicien } = req.body;
        const token = await MecanicienToken.getMecanicienTokenByValue(tokenMecanicien);
        if(!token){
            return res.status(401).json({ message: 'Token expiré 1' });
        }
        res.json(token);
    } catch (error) {
        res.status(500).json({ error: "Erreur : " + error.message });
    }
});

// Unvalid old token (date expiré)
router.post('/unvalidOldToken', async (req, res) => {
    try {
        const { idMecanicien } = req.body; 
        if (!idMecanicien) {
            return res.status(400).json({ error: "L'ID du mecanicien est requis." });
        }
        const response = await MecanicienToken.unvalidOldToken(idMecanicien);
        res.json(response); 

    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

// find mecanicien by token
router.get('/:token', async (req, res) => {
    try {
        const { tokenMecanicien } = req.params.token;
        const idMecanicien = await MecanicienToken.find({tokenMecanicien : tokenMecanicien});
        if(!idMecanicien){
            return res.status(401).json({ message: 'Tsy misy mecanicien' });
        }
        res.json(idMecanicien);
    } catch (error) {
        res.status(500).json({ error: "Erreur : " + error.message });
    }
});

module.exports = router;