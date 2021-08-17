// Importe jsonwebtoken
const jwt = require('jsonwebtoken');

require('dotenv').config()

// Permet de sécuriser toutes les routes
module.exports = (req, res, next) => {
    try {
        // Split le Bearer du token
        const token = req.headers.authorization.split(' ')[1];
        // Défini req.token = le payload (données transmises au front) + verify (signature)
        req.token = jwt.verify(token, process.env.TOKEN_KEY);
            next();
    } catch (error) {
        res.status(401).json({ error: error | 'Requete non authentifié' });
    }
};