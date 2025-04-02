const express = require('express');
const router = express.Router();
const Specialite = require('../../models/Employe/Specialite');

// insert
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const nomSpecialite = new Specialite(req.body);
        await nomSpecialite.save();
        res.status(201).json(nomSpecialite);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Liste
router.get('/', async (req, res) => {
    try {
        const nomSpecialite = await Specialite.find();
        res.json(nomSpecialite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const nomSpecialite = await Specialite.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(nomSpecialite);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        await Specialite.findByIdAndDelete(req.params.id);
        res.json({message: "Specialite supprimé"});
    } catch (error) {
        res.status(500).json({messgae: error.message});
    }
});
module.exports = router;