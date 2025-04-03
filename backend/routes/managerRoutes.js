const express = require('express');
const Employe = require('../../models/Employe/Employe');
const ManagerToken = require('../../models/Manager/ManagerToken');
const router = express.Router();

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, mdp } = req.body;
        // console.log(req.body);

        if (!email || !mdp) {
            return res.status(400).json({ error: "L'email et le mot de passe sont requis." });
        }
        const manager = await Employe.findByEmailAndMdp(email, mdp);
        if (!manager) {
            return res.status(401).json({ error: "Email ou mot de passe incorrect." });
        }
        const token = await ManagerToken.generateToken(manager);
        res.json({ token, manager });

    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

  
// getManagerTokenByValue
router.post('/tokenByValue', async (req, res) => {
    try {
        const { tokenManager } = req.body;
        if (!tokenManager) {
            return res.status(400).json({ message: 'TokenManager manquant' });
        }
        const managerToken = await ManagerToken.getManagerTokenByValue(tokenManager);

        if (!managerToken) {
            return res.status(404).json({ message: 'managerToken non trouvé' });
        }
        res.json(managerToken);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Logout
router.post('/logout', async (req, res) => {
    try {
        console.log(req.body);
        const idManager = await ManagerToken.find({tokenManager : req.body.params.tokenManager});
        const validTokens = await ManagerToken.getValdiTokenById(idManager[0]?.idManager);
        console.log("Valiiid :", validTokens);
        if(!validTokens){
            return res.status(401).json({ message: 'Token Introuvable' });
        }
        else{
            const managerTokenRes = await ManagerToken.logout(validTokens);
            res.json(managerTokenRes);
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// tester getValidTokenById
router.get('/validTokens', async (req, res) => {
    try {
        const { idManager } = req.body;
        const tokens = await ManagerToken.getValidTokenById(idManager);
        
        res.json(tokens);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des tokens : " + error.message });
    }
});

// Check token
router.get('/checkToken', async (req, res) => {
    try {
        const { tokenManager } = req.body;
        const token = await ManagerToken.getManagerTokenByValue(tokenManager);
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
        const { idManager } = req.body; 
        if (!idManager) {
            return res.status(400).json({ error: "L'ID du manager est requis." });
        }
        const response = await ManagerToken.unvalidOldToken(idManager);
        res.json(response); 

    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

// find manager by token
router.get('/:token', async (req, res) => {
    try {
        const { tokenManager } = req.params.token;
        const idManager = await ManagerToken.find({tokenManager : tokenManager});
        if(!idManager){
            return res.status(401).json({ message: 'Tsy misy manager' });
        }
        res.json(idManager);
    } catch (error) {
        res.status(500).json({ error: "Erreur : " + error.message });
    }
});