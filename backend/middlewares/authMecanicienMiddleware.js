const jwt = require('jsonwebtoken');

const verifyAuthMecanicienToken = (req, res, next) => {
    console.log("Middleware Auth exécuté !");
    console.log("Requête sur :", req.path);

    if (req.path === "/mecanicien/login" || req.path === "/mecanicien/logout") {
        return next();
    }

    console.log("Headers reçus :", req.headers);
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.', xConnecte: '1' });
    }

    console.log('Token reçu :', token);

    // Vérification du token
    jwt.verify(token, process.env.JWT_SECRET || 'mekansoa', (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expiré.', xConnecte: '1' });
            }
            return res.status(401).json({ message: 'Token invalide.', xConnecte: '1' });
        }

        console.log("Token valide. Utilisateur :", decoded);

        req.mecanicien = decoded;

        if (req.path === "/auth/checkToken") {
            return res.status(200).json({ message: 'Token valide.', xConnecte: '0', mecanicien: decoded });
        }
        next();
    });
};

module.exports = verifyAuthMecanicienToken;
