const express = require('express');
const Client = require('../../models/Client/Client');
const ClientToken = require('../../models/Client/ClientToken');
const router = express.Router();

// insert
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const client = new Client(req.body);
        await client.save();
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Liste
router.get('/', async (req, res) => {
    try {
        const client = await Client.find();
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/getClientById/:idClient', async (req, res) => {
    try {
        const client = await Client.findOne({ _id: req.params.idClient }); 
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete 
router.delete('/:id', async (req, res) => {
    try {
        await Client.findByIdAndDelete(req.params.id);
        res.json({message: "client supprimé"});
    } catch (error) {
        res.status(500).json({messgae: error.message});
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, mdp } = req.body;
        // console.log(req.body);

        if (!email || !mdp) {
            return res.status(400).json({ error: "L'email et le mot de passe sont requis." });
        }
        const client = await Client.findByEmailAndMdp(email, mdp);
        if (!client) {
            return res.status(401).json({ error: "Email ou mot de passe incorrect." });
        }
        const token = await ClientToken.generateToken(client);
        res.json({ token, client });

    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

  
// getClientTokenByValue
router.post('/tokenByValue', async (req, res) => {
    try {
        const { tokenClient } = req.body;
        if (!tokenClient) {
            return res.status(400).json({ message: 'TokenClient manquant' });
        }
        const clientToken = await ClientToken.getClientTokenByValue(tokenClient);

        if (!clientToken) {
            return res.status(404).json({ message: 'ClientToken non trouvé' });
        }
        res.json(clientToken);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Logout
router.post('/logout', async (req, res) => {
    try {
        console.log(req.body);
        const idClient = await ClientToken.find({tokenClient : req.body.params.tokenClient});
        const validTokens = await ClientToken.getValdiTokenById(idClient[0]?.idClient);
        console.log("Valiiid :", validTokens);
        if(!validTokens){
            return res.status(401).json({ message: 'Token Introuvable' });
        }
        else{
            const clientTokenRes = await ClientToken.logout(validTokens);
            res.json(clientTokenRes);
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// tester getValidTokenById
router.get('/validTokens', async (req, res) => {
    try {
        const { idClient } = req.body;
        const tokens = await ClientToken.getValidTokenById(idClient);
        
        res.json(tokens);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des tokens : " + error.message });
    }
});

// Check token
router.get('/checkToken', async (req, res) => {
    try {
        console.log("bbooonnjjoouurr");
        const { tokenClient } = req.body;
        console.log("tokenClient ",tokenClient);
        const token = await ClientToken.getClientTokenByValue(tokenClient);
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
        const { idClient } = req.body; 
        if (!idClient) {
            return res.status(400).json({ error: "L'ID du client est requis." });
        }
        const response = await ClientToken.unvalidOldToken(idClient);
        res.json(response); 

    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

// find client by token
router.get('/:token', async (req, res) => {
    try {
        const { tokenClient } = req.params.token;
        const idClient = await ClientToken.find({tokenClient : tokenClient});
        if(!idClient){
            return res.status(401).json({ message: 'Tsy misy client' });
        }
        res.json(idClient);
    } catch (error) {
        res.status(500).json({ error: "Erreur : " + error.message });
    }
});

module.exports = router;
