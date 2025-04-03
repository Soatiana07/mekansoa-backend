const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const authMiddleware = require('./middlewares/authClientMiddleware');
const verifyAuthToken = require('./middlewares/authClientMiddleware'); 
const verifyAuthMecanicienToken = require('./middlewares/authMecanicienMiddleware'); 
const verifyAuthManagerToken = require('./middlewares/authManagerMiddleware'); 

require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'X-Connecte'],
    exposedHeaders: ['X-Connecte', 'Authorization']
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Connecte");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Expose-Headers", "X-Connecte, Authorization");
    next();
});

app.use(express.json());
// app.use(authMiddleware);

app.use(verifyAuthToken);
app.use(verifyAuthMecanicienToken);
app.use(verifyAuthManagerToken);


app.get('/auth/checkToken', (req, res) => {
    
});
app.get('/auth/checkTokenMecanicien', (req, res) => {
    
});

app.get('/auth/checkTokenManager', (req, res) => {
    
});


const PORT = process.env.PORT || 5000;
// Connexion a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => console.log("MongoBD connecté"))
    .catch(err => console.log(err));

// Routes montées sur '/articles'
app.use('/articles', require('./routes/articleRoutes'));
app.use('/detailEntreePiece', require('./routes/ManagerRoutes/detailsEntreePieceRoutes'));
app.use('/detailSortiePiece', require('./routes/ManagerRoutes/detailsSortiePieceRoutes'));
app.use('/entreePiece', require('./routes/ManagerRoutes/entreePieceRoutes'));
app.use('/fournisseur', require('./routes/ManagerRoutes/fournisseurRoutes'));
app.use('/marqueVoiture', require('./routes/ManagerRoutes/marqueVoitureRoutes'));
app.use('/modePaiement', require('./routes/ManagerRoutes/modePaiementRoutes'));
app.use('/pieces', require('./routes/ManagerRoutes/pieceRoutes'));
app.use('/sortiePiece', require('./routes/ManagerRoutes/sortiePieceRoutes'));
app.use('/anneeVoiture', require('./routes/ManagerRoutes/anneeVoitureRoutes'));
app.use('/categorieService', require('./routes/ManagerRoutes/categorieServiceRoutes'));
app.use('/generationVoiture', require('./routes/ManagerRoutes/generationVoitureRoutes'));
app.use('/service', require('./routes/ManagerRoutes/serviceRoutes'));
app.use('/historiquePrixService', require('./routes/ManagerRoutes/historiquePrixServiceRoutes'));
app.use('/pays', require('./routes/ManagerRoutes/paysRoutes'));
app.use('/role', require('./routes/EmployeRoutes/roleRoutes'));
app.use('/specialite', require('./routes/EmployeRoutes/specialiteRoutes'));
app.use('/employe', require('./routes/EmployeRoutes/employeRoutes'));
app.use('/specialiteEmploye', require('./routes/EmployeRoutes/specialiteEmployeRoutes'));
app.use('/specialiteService', require('./routes/EmployeRoutes/specialiteServiceRoutes'));
app.use('/stockPiece', require('./routes/ManagerRoutes/stockPieceRoutes'));
app.use('/client', require('./routes/ClientRoutes/clientRoutes'));
app.use('/modeleVoiture', require('./routes/ManagerRoutes/modeleVoitureRoutes'));
app.use('/voitureClient', require('./routes/ClientRoutes/voitureClientRoutes'));
app.use('/manager', require('./routes/managerRoutes'));
app.use('/mecanicien', require('./routes/mecanicienRoutes'));

app.use((req, res, next) => {
    console.log("Headers finaux envoyés :", res.getHeaders());
    next();
});
// module.exports = app;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`))
