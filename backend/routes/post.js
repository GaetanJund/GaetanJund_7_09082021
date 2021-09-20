// Mise en place d'Express + Importe le controller
const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/post');

// Importe middleware
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// POST
// Créer un post
router.post("/add", auth, multer, postsCtrl.createPost);
// Mettre à jour un post
router.put("/:id", auth, multer, postsCtrl.updatePost);
// Supprimer un post
router.delete("/:id", auth, postsCtrl.deletePost);
// Liker un post
router.post("/:id/like", auth, postsCtrl.likePost);
// Sélectionner tous les post
router.get("/posts", auth, postsCtrl.getAllPosts);
// Sélectionner un post
router.get("/posts/:id", auth, postsCtrl.getOnePost);

module.exports = router;