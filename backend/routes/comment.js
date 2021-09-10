// Mise en place d'Express + Importe le controller
const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comment');

// Importe middleware
const auth = require("../middleware/auth");

// COMMENTAIRES + LIKES
// Ajouter un commentaire
router.post("/add", auth, commentsCtrl.addComment);
// modifier un commentaire
router.put("/:id", auth, commentsCtrl.updateComment);
// Supprimer un commentaire
router.delete("/:id", auth, commentsCtrl.deleteComment);
// Sélectionner tous les commentaires
router.get("/comments", auth, commentsCtrl.getAllComment);
// Sélectionner un commentaire
router.get("/comments/:id", auth, commentsCtrl.getOneComment);

module.exports = router;