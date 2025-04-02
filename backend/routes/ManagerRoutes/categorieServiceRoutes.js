const express = require('express');
const router = express.Router();
const CategorieService = require('../../models/Manager/CategorieService');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// insert
router.post('/', upload.single('photo'), async (req, res) => {
    try {
        const imageBase64 = req.file.buffer.toString('base64');
        const { nomCategorie ,description} = req.body;
        const categorie = new CategorieService({
            nomCategorie,
            imageCategorie: imageBase64,
            description
        });
        await categorie.save();
        res.status(201).json(categorie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Liste
router.get('/', async (req, res) => {
    try {
        const nomCategorie = await CategorieService.find();
        res.json(nomCategorie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        console.log('moa va tonga aty');
        const { nomCategorie ,description, image} = req.body;
        let imageBase64 = image;

        if (req.file) {
            imageBase64 = req.file.buffer.toString('base64');
        }
        const data = { nomCategorie,imageCategorie: imageBase64,description };

        const categorie = await CategorieService.findByIdAndUpdate(req.params.id,
            data, { new: true });
        res.json(categorie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        await CategorieService.findByIdAndDelete(req.params.id);
        res.json({message: "Categorie supprimé"});
    } catch (error) {
        res.status(500).json({messgae: error.message});
    }
});

// Get by id
router.get('/:id', async (req, res) => {
    try {
        const categorie = await CategorieService.findById(req.params.id);
        res.json(categorie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;