const express = require('express');
const Facture = require('../../models/Client/Facture');
const DemandeDevis = require('../../models/Client/DemandeDevis');
const PlanningEmploye = require('../../models/Employe/PlanningEmploye');
const router = express.Router();

// insert
router.post('/', async (req, res) => {
    try {
        const { dateFacturation, idDemandeDevis, idModePaiement } = req.body;
        const facture = new Facture({
            dateFacturation,
            idDemandeDevis,
            idModePaiement
        });
        await facture.save();
        const demande = await DemandeDevis.findOne({ _id: idDemandeDevis });
        demande.etat = 4
        await demande.save();

        const planning = await PlanningEmploye.find({ idDevis: idDemandeDevis});
        console.log("planninglllll ",planning);
        for (const p of planning) {
            p.etat = 3;
            await p.save();
        } 
        res.status(201).json(facture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Liste
router.post('/listeFacture', async (req, res) => {
    try {
        const { idDemandeDevis } = req.body;
        const facture = await Facture.findOne({
            idDemandeDevis
        })
            .populate("idModePaiement")
            .exec();
            console.log("facturessss ",facture);
        res.json(facture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;