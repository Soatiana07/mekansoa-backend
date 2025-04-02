const express = require('express');
const router = express.Router();
const SpecialiteService = require('../../models/Employe/SpecialiteService');

// insert
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const specialiteService = new SpecialiteService(req.body);
        await specialiteService.save();
        res.status(201).json(specialiteService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Liste
router.get('/', async (req, res) => {
    try {
        const specialiteService = await SpecialiteService.find()
            .populate('idService', 'nomService')  // Inclut le nom du service
            .populate('idSpecialite', 'nomSpecialite'); // Inclut le nom de la spécialité
        res.json(specialiteService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const specialiteService = await SpecialiteService.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        console.log(req.body);
        res.json(specialiteService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        await SpecialiteService.findByIdAndDelete(req.params.id);
        res.json({ message: "SpecialiteService supprimé" });
    } catch (error) {
        res.status(500).json({ messgae: error.message });
    }
});

// getByIdService
router.get('/:idService', async (req, res) => {
    try {
        const services = await SpecialiteService.find({ idService: req.params.idService })
            .populate('idService', 'nomService')  // Inclut le nom du service
            .populate('idSpecialite', 'nomSpecialite'); // Inclut le nom de la spécialité
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/getSpecialiteByService', async (req, res) => {
    try {
        const { services } = req.body;

        let specialite = [];

        for (const service of services) {
            const result = await SpecialiteService.find({ idService: service.idService._id })
                .populate('idService', 'nomService')
                .populate('idSpecialite', 'nomSpecialite')
                .exec(); 

          
            specialite.push(...result);
        }

        res.json(specialite);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;