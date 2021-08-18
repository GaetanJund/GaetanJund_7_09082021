// Mise en place d'Express + Importe le controller
const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comment');

// Importe middleware
const auth = require("../middleware/auth");

// COMMENTAIRES + LIKES
// Ajouter un commentaire
router.post("/:id/comments", auth, commentsCtrl.addComment);
// modifier un commentaire
router.post("/:id/comments", auth, commentsCtrl.updateComment);
// Supprimer un commentaire
router.delete("/comments/:id", auth, commentsCtrl.deleteComment);

module.exports = router;