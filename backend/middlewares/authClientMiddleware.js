const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try { 
        console.log("tonga aty zaaaaaa");
        console.log("req.path :", req.path);
        
        if (req.path === "/client/login" || req.path === "/client/logout" || req.path === "/client") {
            return next();
        }

        console.log("Headers reçus via req :", req.headers);
        
        const token = req.header('Authorization')?.split(' ')[1];
        console.log('Token : ', token);
        res.setHeader('Authorization', token);
        
        if (!token) {
            // res.setHeader('X-Connecte', '1');  
            return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
        }

        // const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mekansoa');
        jwt.verify(token, process.env.JWT_SECRET || 'mekansoa', (err, decoded) => {
            if (err) {
              return res.status(401).json({ message: 'Token expiré ou invalide' });
            }
            req.user = decoded;
            next();
        });
        console.log('Decoded : ', decoded);
        
        req.client = decoded;
        // res.setHeader('X-Connecte', '0');  
        // console.log('Header X-Connecte ajoutéeeeeee:', res.getHeaders('X-Connecte'));

        next();
    } catch (error) {
        // res.setHeader('X-Connecte', '1');  
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expiré.' });
        }
        return res.status(401).json({ message: 'Token invalide ou expiré.' });
    }
};

// const jwt = require('jsonwebtoken');

// module.exports = async (req, res, next) => {
//     try {
//         console.log("Middleware auth - Path :", req.path);

//         if (req.path === "/client/login" || req.path === "/client/logout" || req.path === "/client") {
//             return next();
//         }

//         console.log("Headers reçus via req :", req.headers);

//         const token = req.header('Authorization')?.split(' ')[1];
//         console.log('Token :', token);

//         if (!token) {
//             return res.status(401).json({
//                 message: 'Accès refusé. Aucun token fourni.',
//                 xConnecte: '1',  // xConnecte dans la réponse JSON
//             });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mekansoa');
//         console.log('Decoded :', decoded);

//         req.client = decoded;

//         // Si le token est valide, ajouter xConnecte dans la réponse JSON
//         return res.status(200).json({
//             message: 'Token valide.',
//             xConnecte: '0',  // Token valide
//             user: decoded,   // Ajouter les informations du client ou d'autres données
//         });

//     } catch (error) {
//         return res.status(401).json({
//             message: 'Token invalide ou expiré.',
//             xConnecte: '1',  // xConnecte dans la réponse JSON en cas d'erreur
//         });
//     }
// };
