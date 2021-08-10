// Mise en place d'Express + Importe le controller
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// Importer les middleware

// Créer 2 routes POST

// Ajout de l'utilisateur dans la base de donnée
router.post('/signup', userCtrl.signup);
// Connecte un utilisateur déjà inscrit
router.post('/login', userCtrl.login);
// Supprimer un compte
router.delete("/accounts/:id", auth, userCtrl.deleteAccount);
// Modifier compte
router.put("/accounts/:id", auth, multer, userCtrl.updateAccount);

module.exports = router;