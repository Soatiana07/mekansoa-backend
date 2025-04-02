const express = require('express');
const router = express.Router();
const SpecialiteEmploye = require('../../models/Employe/SpecialiteEmploye');

// insert
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const specialiteEmploye = new SpecialiteEmploye(req.body);
        await specialiteEmploye.save();
        res.status(201).json(specialiteEmploye);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Liste
router.get('/', async (req, res) => {
    try {
        const specialiteEmploye = await SpecialiteEmploye.find()
        .populate('idEmploye')
        .populate('idSpecialite');
        res.json(specialiteEmploye);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const specialiteEmploye = await SpecialiteEmploye.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(specialiteEmploye);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        await SpecialiteEmploye.findByIdAndDelete(req.params.id);
        res.json({message: "SpecialiteEmploye supprimé"});
    } catch (error) {
        res.status(500).json({messgae: error.message});
    }
});

router.post('/getEmployeBySpecialite', async (req, res) => {
    try {
        console.log('jjjjjjjjjjjj');
        const { groupesServiceSpecialtite } = req.body;
        console.log('Services reçus:', groupesServiceSpecialtite);
        console.log('kkkkkkkkk');
        console.log(groupesServiceSpecialtite[0]?.specialites[0]?._id);
        let employe = [];

        for (const service of groupesServiceSpecialtite) {
            for (const specialite of service.specialites) { // Parcours toutes les spécialités du service
                const result = await SpecialiteEmploye.find({ idSpecialite: specialite._id }) 
                    .populate('idEmploye', 'nom')
                    .populate('idSpecialite', 'nomSpecialite')
                    .exec(); 
        
                employe.push(...result);
            }
        }
        
        console.log(employe);
        res.json(employe);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;