const express = require('express');
const DetailsDemandeDevis = require('../../models/Client/DetailsDemandeDevis');
const router = express.Router();

// insert
router.post('/', async (req, res) => {
    try {
        const detail = new DetailsDemandeDevis(req.body);
        await detail.save();
        res.status(201).json(detail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Liste
router.get('/', async (req, res) => {
    try {
        const detail = await DetailsDemandeDevis.find()
        .populate("idDemandeDevis")  
        .populate("idService")  
        .populate("idPiece")  
        .exec();
        res.json(detail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/getDetailServiceDemandeDevisById/:idDemandeDevis', async (req, res) => {
    try {
        console.log("inty ahoo");
        const detail = await DetailsDemandeDevis.find({
            idDemandeDevis: req.params.idDemandeDevis,
            idService: { $exists: true, $ne: null } 
        })
        .populate("idDemandeDevis")  
        .populate("idService")  
        .populate("idPiece")  
        .exec();
     
        res.json(detail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/getDetailPieceDemandeDevisById/:idDemandeDevis', async (req, res) => {
    try {
        const detail = await DetailsDemandeDevis.find({
            idDemandeDevis: req.params.idDemandeDevis,
            idPiece: { $exists: true, $ne: null } 
        })
        .populate("idDemandeDevis")  
        .populate("idService")  
        .populate("idPiece")  
        .exec();
        console.log("kkkkkkk");
        console.log(detail);
        res.json(detail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;