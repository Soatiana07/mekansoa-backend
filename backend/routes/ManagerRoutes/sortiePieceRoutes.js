const express = require('express');
const router = express.Router();
const SortiePiece = require('../../models/Manager/SortiePiece');
const DetailsSortiePiece = require('../../models/Manager/DetailsSortiePiece');
const StockPiece = require('../../models/Manager/StockPiece');

router.post('/', async (req, res) => {
    try {
        console.log('inty aho');
        const { dateSortie, idDevis, details,idModePaiement } = req.body;
        const sortie = new SortiePiece({
            dateSortie,
            idDevis: null,
            idModePaiement
        }
        );
        await sortie.save();

        const pieces = req.body.details;
        for (const piece of pieces) {
            const detail = new DetailsSortiePiece({
                idSortiePiece: sortie._id,
                idPiece: piece.idPiece,
                qte: Number(piece.qte),
                prixVente: Number(piece.prixVente)
            });
            await detail.save();
        }

        for (const piece1 of pieces) {
            const stock = await StockPiece.findOne({ idPiece: piece1.idPiece });
            if (stock) {
                stock.qte -= Number(piece1.qte);
                await stock.save();
            }
        }
        res.status(201).json(sortie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const sortie = await SortiePiece.find()
        .populate("idModePaiement")  
        .exec();
        console.log(sortie);
        res.json(sortie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/totalSortie/:idSortiePiece', async (req, res) => {
    try {
        const { idSortiePiece } = req.params;

        const total = await DetailsSortiePiece.aggregate([
            { $match: { idSortiePiece: idSortiePiece } },  
            { 
                $group: { 
                    _id: null, 
                    totalPrix: { $sum: { $multiply: ["$prixVente", "$qte"] } } 
                } 
            }
        ]);

        if (total.length > 0) {
            res.json({ totalPrix: total[0].totalPrix });
        } else {
            res.json({ totalPrix: 0 }); 
        }
    } catch (error) {
        console.error("Erreur lors du calcul du prix total:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const sortie = await SortiePiece.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(sortie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
module.exports = router;