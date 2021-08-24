// Mise en place d'Express + Importe le controller
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// Importe la vérification du password + blocage paswword
const auth = require("../middleware/auth");
const verifPassword = require('../middleware/password-verif');
const multer = require("../middleware/multer-config");

// Création routes

// Ajout de l'utilisateur dans la base de donnée
router.post('/signup', verifPassword, userCtrl.signup);
// Connecte un utilisateur déjà inscrit
router.post('/login', userCtrl.login);
// Supprimer un compte
router.delete("/account/:id", auth, userCtrl.deleteUser);
// Modifier compte
router.put("/account/:id", auth, multer, userCtrl.updateUser);

module.exports = router;