// Importe fs
const fs = require('fs');

// Import model
const { Post, User, Comments } = require('../models/index');

// Créer un post
exports.createPost = (req, res, next) => {
    const post = new Post({
        message: req.body.message,
        user_id: req.token.userId
    })
    // Sauvegarde post dans la base de donnée
    post.save()
        .then(() => res.status(201).json({ message: 'Post enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

// Supprimer un post
exports.deletePost = (req, res, next) => {
    Post.findOne({
        where: {
            _id: req.params.id
        }
    }).then(
        (post) => {
            if (post.user_id == req.token.userId || req.token.isAdmin) {
                Post.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: "Post supprimé !" }))
                    .catch(error => res.status(400).json({ error }))
            } else {
                res.status(403).json({ message: "Vous n'avez pas les droits pour supprimer le post" })
            }
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );

};

// Modifier un post
exports.updatePost = (req, res, next) => {
    Post.findOne({
        where: {
            _id: req.params.id
        }
    }).then(
        (post) => {
            if (post.user_id == req.token.userId || req.token.isAdmin) {
                Post.update({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: "Post modifié !" }))
                    .catch(error => res.status(400).json({ error }))
            } else {
                res.status(403).json({ message: "Vous n'avez pas les droits pour modifier le post" })
            }
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );

};

// Récupérer un post
exports.getOnePost = (req, res, next) => {
    // Récupère le post via son id
    Post.findOne({
        _id: req.params.id
    }).then(
        (Post) => {
            res.status(200).json(Post);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

// Récupérer tous les post
exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        include: [User, { model: Comments, include: User }]
    })
        .then(Post => res.status(200).json(Post))
        .catch(error => res.status(400).json({ error }));
};

// Liker un post
exports.likePost = (req, res, next) => {
    const like = req.body.like
    const userId = req.body.userId
    const postId = req.params.id

    if (like === 1) { // Pour ajouter un like
        Post.updateOne({
            _id: postId
        }, {
            // On sauvegarde utilisateur qui a liké et ajout +1 compteur de like
            $push: {
                usersLiked: userId
            },
            $inc: {
                likes: +1
            },
        })  // Envoi de l'info à la console
            .then(() => res.status(200).json({
                message: 'Post liké !'
            }))
            .catch((error) => res.status(400).json({
                error
            }))
    }
    if (like === 0) { // Pour annuler un like/dislike
        Post.findOne({
            _id: postId
        })
            .then((post) => {
                if (post.usersLiked.includes(userId)) { // Annuler un like et enleve -1 au compteur de like
                    Post.updateOne({
                        _id: postId
                    }, {
                        $pull: {
                            usersLiked: userId
                        },
                        $inc: {
                            likes: -1
                        },
                    })
                        .then(() => res.status(200).json({
                            message: 'Like retiré pour cette sauce !'
                        }))
                        .catch((error) => res.status(400).json({
                            error
                        }))
                }
            })
            .catch((error) => res.status(404).json({
                error
            }))
    }
};