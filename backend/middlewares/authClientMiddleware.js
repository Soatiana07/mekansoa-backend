// const jwt = require('jsonwebtoken');

// module.exports = async (req, res, next) => {
//     console.log("tonga aty zaaaaaa");
//     console.log("req.path :", req.path);

//     if (req.path === "/client/login" || req.path === "/client/logout" || req.path === "/client") {
//         return next();
//     }

//     console.log("Headers reçus via req :", req.headers);

//     const token = req.header('Authorization')?.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
//     }

//     console.log('Token : ', token);
//     res.setHeader('Authorization', `Bearer ${token}`);

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             if (err.name === 'TokenExpiredError') {
//                 return res.json({ message: 'Token expiré.' });
//             }
//             return res.json({ message: 'Token invalide.' });
//         }

//         req.client = decoded;
//         next();
//     });
// };

const jwt = require('jsonwebtoken');

/**
 * Middleware pour vérifier le token d'authentification
 */
const verifyAuthToken = (req, res, next) => {
    console.log("Middleware Auth exécuté !");
    console.log("Requête sur :", req.path);

    // Exclure certaines routes du contrôle de token
    if (req.path === "/client/login" || req.path === "/client/logout") {
        return next();
    }

    console.log("Headers reçus :", req.headers);

    // Récupération du token
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

        // Ajouter l'utilisateur dans req pour les prochains middlewares/routes
        req.client = decoded;

        // Si la requête est une vérification explicite du token, répondre directement
        if (req.path === "/auth/checkToken") {
            return res.status(200).json({ message: 'Token valide.', xConnecte: '0', user: decoded });
        }

        next();
    });
};

module.exports = verifyAuthToken;
