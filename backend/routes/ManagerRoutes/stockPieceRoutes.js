const express = require('express');
const StockPiece = require('../../models/Manager/StockPiece');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const stock = new StockPiece(req.body);
        await stock.save();
        res.status(201).json(stock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const stock = await StockPiece.find()
            .populate("idPiece")
            .exec();

        const stockAvecPrixTotal = stock.map(item => ({
            ...item.toObject(),
            prixTotal: item.prixUnitaire + (item.prixUnitaire * (item.margeBeneficiaire || 0) / 100)
        }));

        res.json(stockAvecPrixTotal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/stockByPiece/:idPiece', async (req, res) => {
    try {
        const stock = await StockPiece.find({ idPiece: req.params.idPiece })
        .populate("idPiece")  
        .exec();
        const stockAvecPrixTotal = stock.map(item => ({
            ...item.toObject(),
            prixTotal: item.prixUnitaire + (item.prixUnitaire * (item.margeBeneficiaire || 0) / 100)
        }));
        res.json(stockAvecPrixTotal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.put('/:id', async (req, res) => {
    try {
        const stock = await StockPiece.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(stock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
module.exports = router;