const express = require('express');
const router = express.Router();
const ModeleVoiture = require('../../models/Manager/ModeleVoiture');

// insert
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const modele = new ModeleVoiture(req.body);
        await modele.save();
        res.status(201).json(modele);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Liste
router.get('/', async (req, res) => {
    try {
        const modele = await ModeleVoiture.find();
        res.json(modele);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const modele = await ModeleVoiture.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(modele);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        await ModeleVoiture.findByIdAndDelete(req.params.id);
        res.json({message: "Année supprimé"});
    } catch (error) {
        res.status(500).json({messgae: error.message});
    }
});

router.get('/chercheModeleVoiture', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.json([]); 
        }
        const modele = await ModeleVoiture.find(
                { modele: { $regex: query, $options: 'i' } }
              );
        res.json(modele);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/getModeleId/:id', async (req, res) => {
    try {
        const modele = await ModeleVoiture.find({ _id: req.params.id });
        res.json(modele);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;