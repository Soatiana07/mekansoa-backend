const express = require('express');
const PlanningEmploye = require('../../models/Employe/PlanningEmploye');
const router = express.Router();


// insert
router.post('/', async (req, res) => {
    try {
        const p = new PlanningEmploye(req.body);
        await p.save();
        res.status(201).json(p);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Liste
router.get('/', async (req, res) => {
    try {
        const p = await PlanningEmploye.find();
        res.json(p);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/listePlaningSuperieurDate', async (req, res) => {
    try {
        const { date, listeEmploye } = req.body;
        console.log("planning");
        console.log(req.body);
        if (!date) {
            return res.status(400).json({ message: "Veuillez fournir une date valide." });
        }

        const plannings = await PlanningEmploye.find({
            deadline: { $gte: new Date(date) }
        })
        .sort({ deadline: 1 }); // Tri par ordre croissant
        

        console.log("planning employe", plannings);

        const employesAffectes = plannings.map(planning => planning.idEmploye.toString());
        const employesAffectessss = plannings.map(planning => planning);
        console.log("employe affecte ", employesAffectessss);

        // 3️⃣ Filtrer les employés qui ne sont pas dans la liste des employés affectés
        const employesDisponibles = listeEmploye.filter(employe =>
            !employesAffectes.includes(employe._id.toString())
        );

     
      
        console.log("valinyyyy");
        console.log(employesDisponibles);
        res.json({
            employesDisponibles: employesDisponibles,
            employesAffectes: employesAffectessss
        });
        // res.json(employesDisponibles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Update
router.put('/:id', async (req, res) => {
    try {
        const p = await PlanningEmploye.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(p);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        await PlanningEmploye.findByIdAndDelete(req.params.id);
        res.json({ message: "Année supprimé" });
    } catch (error) {
        res.status(500).json({ messgae: error.message });
    }
});


module.exports = router;