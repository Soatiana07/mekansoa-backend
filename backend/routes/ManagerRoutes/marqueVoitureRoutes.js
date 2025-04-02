const express = require('express');
const router = express.Router();
const MarqueVoiture = require('../../models/Manager/MarqueVoiture');

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const marque = new MarqueVoiture(req.body);
        await marque.save();
        res.status(201).json(marque);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const marque = await MarqueVoiture.find();
        res.json(marque);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const marque = await MarqueVoiture.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(marque);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await MarqueVoiture.findByIdAndDelete(req.params.id);
        res.json({ message: "Marque supprimé" });
    } catch (error) {
        console.log('bye');
        res.status(500).json({ messgae: error.message });
    }
});


// router.put('/:id/etat', async (req, res) => {
//     try {
//         const fournisseur = await Fournisseur.findByIdAndUpdate(
//             req.params.id,
//             { $set: { etat: 1 } }, // Met à jour uniquement l'état à 1
//             { new: true } // Retourne le document mis à jour
//         );

//         if (!fournisseur) {
//             return res.status(404).json({ message: "Fournisseur non trouvé" });
//         }

//         res.json(fournisseur);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// router.put('/:id', async (req, res) => {
//     try {
//         const { nom, etat } = req.body; // Récupération des champs à modifier

//         const fournisseur = await Fournisseur.findByIdAndUpdate(
//             req.params.id,
//             { $set: { nom, etat } }, // Mise à jour de nom et etat
//             { new: true, runValidators: true } // Retourne le document mis à jour et applique les validations
//         );

//         if (!fournisseur) {
//             return res.status(404).json({ message: "Fournisseur non trouvé" });
//         }

//         res.json(fournisseur);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

router.get('/chercheMarqueVoiture', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.json([]);
        }
        const marqueV = await MarqueVoiture.find(
            { marque: { $regex: query, $options: 'i' } }
        );
        res.json(marqueV);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/getMarqueId/:id', async (req, res) => {
    try {
        const marqueV = await MarqueVoiture.find({ _id: req.params.id });
        res.json(marqueV);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;