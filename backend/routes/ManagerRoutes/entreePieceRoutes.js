const express = require('express');
const router = express.Router();
const EntreePiece = require('../../models/Manager/EntreePiece');
const DetailsEntreePiece = require('../../models/Manager/DetailsEntreePiece');
const StockPiece = require('../../models/Manager/StockPiece');

router.post('/', async (req, res) => {
    try {
        //  ajout d'une entree
        const { dateEntree, idFournisseur, numeroBl, commentaire, details } = req.body;
        const dateNaissanceObj = new Date(dateEntree);
        const entree = new EntreePiece({
            dateEntree,
            fournisseur: idFournisseur,
            numeroBl,
            commentaire
        }
        );
        await entree.save();

        // ajout des details;
        const pieces = req.body.details;
        for (const piece of pieces) {
            const detail = new DetailsEntreePiece({
                idEntreePiece: entree._id,
                idPiece: piece.idPiece,
                prixUnitaire: Number(piece.prixUnitaire),
                qte: Number(piece.nombre),
                margeBeneficiaire: Number(piece.margeBeneficiaire),
                dateExpiration: piece.dateExpiration
            });
            await detail.save();
        }

        // update stock
        for (const piece1 of pieces) {   
            const stock = await StockPiece.findOne({ idPiece: piece1.idPiece });
            if (stock) {
                stock.qte += Number(piece1.nombre); 
                stock.prixUnitaire = Number(piece1.prixUnitaire);
                stock.margeBeneficiaire = Number(piece1.margeBeneficiaire);
                await stock.save();
            }
        }
        res.status(201).json(entree);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/entreePieceById/:id', async (req, res) => {
    try {
        const entree = await EntreePiece.find({ _id: req.params.id })
        .populate("fournisseur")  
        .exec();
        res.json(entree);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const fournisseur = await EntreePiece.find()
        .populate("fournisseur")  
        .sort({ _id: -1 })
        .exec();
        res.json(fournisseur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const entree = await EntreePiece.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(entree);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
module.exports = router;