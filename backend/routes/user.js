// Mise en place d'Express + Importe le controller
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// Importe la vérification du password + blocage paswword
const auth = require("../middleware/auth");
const verifPassword = require('../middleware/password-verif');
const multer = require("../middleware/multer-config");

// Créer 2 routes POST

// Ajout de l'utilisateur dans la base de donnée
router.post('/signup', verifPassword, userCtrl.signup);
// Connecte un utilisateur déjà inscrit
router.post('/login', userCtrl.login);
// Supprimer un compte
router.delete("/:id", auth, userCtrl.deleteUser);
// Modifier compte
router.put("/:id", auth, multer, userCtrl.updateUser);

module.exports = router;