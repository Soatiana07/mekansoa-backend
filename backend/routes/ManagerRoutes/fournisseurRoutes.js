const express = require('express');
const router = express.Router();
const Fournisseur = require('../../models/Manager/Fournisseur');

router.post('/', async (req, res) => {
    try {
        console.log('ato za e ');
        const fournisseur = new Fournisseur(req.body);
        await fournisseur.save();
        res.status(201).json(fournisseur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const fournisseur = await Fournisseur.find()
        .populate("pays")  
        .sort({ _id: -1 })
        .exec();
        res.json(fournisseur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const fournisseur = await Fournisseur.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(fournisseur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/chercheFournisseur', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.json([]); 
        }
        const fournisseur = await Fournisseur.find({ nom: { $regex: query, $options: 'i' } });
        res.json(fournisseur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;