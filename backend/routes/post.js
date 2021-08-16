// Mise en place d'Express + Importe le controller
const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/post');

// Importe middleware
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// POST
// Sélectionner tous les post
router.get("/", auth, postsCtrl.getAllPosts);
// Sélectionner un post
router.get("/:id", auth, postsCtrl.getOnePost);
// Créer un post
router.post("/add", auth, multer, postsCtrl.createPost);
// Mettre à jour un post
router.put("/:id", auth, multer, postsCtrl.updatePost);
// Supprimer un post
router.delete("/:id", auth, multer, postsCtrl.deletePost);
// Liker un post
router.post("/:id/like", auth, postsCtrl.likePost);

// COMMENTAIRE + LIKES
// Ajouter un commentaire
router.post("/:id/comments", auth, postsCtrl.addComment);
// modifier un commentaire
router.post("/:id/comments", auth, postsCtrl.updateComment);
// Supprimer un commentaire
router.delete("/comments/:id", auth, postsCtrl.deleteComment);

module.exports = router;