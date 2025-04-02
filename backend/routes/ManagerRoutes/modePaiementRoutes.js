const express = require('express');
const router = express.Router();
const ModePaiement = require('../../models/Manager/ModePaiement');

router.post('/', async (req, res) => {
    try {
        const mode = new ModePaiement(req.body);
        await mode.save();
        res.status(201).json(mode);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const mode = await ModePaiement.find();
        res.json(mode);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const mode = await ModePaiement.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(mode);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
module.exports = router;