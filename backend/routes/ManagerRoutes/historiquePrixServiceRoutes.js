const express = require('express');
const router = express.Router();
const HistoriquePrixService = require('../../models/Manager/HistoriquePrixService');

//insert
router.post('/', async (req, res) => {
    try {
        const histo = new HistoriquePrixService(req.body);
        await histo.save();
        res.status(201).json(histo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//liste
router.get('/', async (req, res) => {
    try {
        const histo = await HistoriquePrixService.find()
        .populate('idService');
        res.json(histo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//update
router.put('/:id', async (req, res) => {
    try {
        const histo = await HistoriquePrixService.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(histo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        await HistoriquePrixService.findByIdAndDelete(req.params.id);
        res.json({message: "Historique prix supprimé"});
    } catch (error) {
        res.status(500).json({messgae: error.message});
    }
});
module.exports = router;