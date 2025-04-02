const express = require('express');
const router = express.Router();
const Pays = require('../../models/Manager/Pays');



// Liste
router.get('/', async (req, res) => {
    try {
        const annee = await Pays.find();
        res.json(annee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Recherche avec autocomplétion
router.get('/search', async (req, res) => {
    try {
        const query = req.query.q; // Récupération du paramètre "q" depuis l'URL
        if (!query) {
            return res.json([]); // Retourne une liste vide si aucun texte n'est saisi
        }
        
        // Recherche insensible à la casse et partielle
        const pays = await Pays.find({ nom_fr_fr: { $regex: query, $options: 'i' } }).limit(10);
        
        res.json(pays);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;