const express = require('express');
const VoitureClient = require('../../models/Client/VoitureClient');
const router = express.Router();

// insert
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const voiture = new VoitureClient(req.body);
        await voiture.save();
        res.status(201).json(voiture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Liste
router.get('/', async (req, res) => {
    try {
        const voiture = await VoitureClient.find();
        res.json(voiture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/getVoitureClientById/:idClient', async (req, res) => {
    try {
        const voiture = await VoitureClient.find({ idClient: req.params.idClient })
        .populate("idClient")
        .populate("idAnnee")  
        .populate("idGeneration")  
        .populate("idMarque")  
        .populate("idModele")  
        .exec();
        console.log(voiture);
        res.json(voiture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;