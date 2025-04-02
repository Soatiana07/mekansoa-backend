const express = require('express');
const router = express.Router();
const Role = require('../../models/Employe/Role');

// insert
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const nomRole = new Role(req.body);
        await nomRole.save();
        res.status(201).json(nomRole);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Liste
router.get('/', async (req, res) => {
    try {
        const nomRole = await Role.find();
        res.json(nomRole);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const nomRole = await Role.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(nomRole);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        await Role.findByIdAndDelete(req.params.id);
        res.json({message: "Role supprimé"});
    } catch (error) {
        res.status(500).json({messgae: error.message});
    }
});
module.exports = router;