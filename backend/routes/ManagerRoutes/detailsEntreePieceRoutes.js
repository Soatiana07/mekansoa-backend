const express = require('express');
const router = express.Router();
const DetailsEntreePiece = require('../../models/Manager/DetailsEntreePiece');

router.post('/', async (req, res) => {
    try {
        const { idPiece, prixUnitaire, nombre, margeBeneficiaire, dateExpiration } = req.body;
        const detail = new DetailsEntreePiece({
            idPiece,
            prixUnitaire,
            qte: nombre,
            margeBeneficiaire,
            dateExpiration
        });
        await detail.save();
        res.status(201).json(detail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const detail = await DetailsEntreePiece.find({ idEntreePiece: req.body.idEntreePiece })
        .populate("idPiece")  
        .exec();
        res.json(detail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const detail = await DetailsEntreePiece.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(detail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/detailEntreePieceByPiece/:idEntreePiece', async (req, res) => {
    try {
        const detail = await DetailsEntreePiece.find({ idEntreePiece: req.params.idEntreePiece })
        .populate("idPiece")  
        .exec(); 

        const details = detail.map(item => ({
            ...item.toObject(),
            prixTotal: item.prixUnitaire + (item.prixUnitaire * (item.margeBeneficiaire || 0) / 100)
        }));
        res.json(details);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;