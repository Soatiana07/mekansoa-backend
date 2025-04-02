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
        
        if (!token) {
            res.setHeader('X-Connecte', '1');  
            return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mekansoa');
        console.log('Decoded : ', decoded);
        
        req.client = decoded;
        res.setHeader('X-Connecte', '0');  
        console.log('Header X-Connecte ajoutéeeeeee:', res.getHeaders('X-Connecte'));

        next();
    } catch (error) {
        res.setHeader('X-Connecte', '1');  
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expiré.' });
        }
        return res.status(401).json({ message: 'Token invalide ou expiré.' });
    }
};
