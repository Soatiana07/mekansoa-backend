const express = require('express');
const router = express.Router();
const GenerationVoiture = require('../../models/Manager/GenerationVoiture');

// insert
router.post('/', async (req, res) => {
    try {
        const generation = new GenerationVoiture(req.body);
        await generation.save();
        res.status(201).json(generation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Liste
router.get('/', async (req, res) => {
    try {
        const generation = await GenerationVoiture.find();
        res.json(generation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const generation = await GenerationVoiture.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(generation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        await GenerationVoiture.findByIdAndDelete(req.params.id);
        res.json({message: "Generation supprimé"});
    } catch (error) {
        res.status(500).json({messgae: error.message});
    }
});


router.get('/chercheGenerationVoiture', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.json([]); 
        }
        const generatyionV = await GenerationVoiture.find(
                { generation: { $regex: query, $options: 'i' } }
              );
        res.json(generatyionV);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/getGenerationById/:id', async (req, res) => {
    try {
        const generatyionV = await GenerationVoiture.find({ _id: req.params.id });
        res.json(generatyionV);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;