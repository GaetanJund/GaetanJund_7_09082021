// Importe fs
const fs = require('fs'),

// Import model
const { Post } = require('./models/index');

// Créer un post
exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    const post = new Post({
        ...postObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        usersLiked: []
    });
    post.save()
        .then(() => res.status(201).json({ message: 'Post enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

// Supprimer un post
exports.deletePost = (req, res, next) => {
    const where = {
        id: req.params.id
    }

    if (!req.user.admin) {
        where.userId = req.user.id
    }

    Post.findOne({ where })
        .then(post => {
            if (!post) {
                res.status(400).json({ error: "Vous n'avez pas l'autorisation" })
            }
            post
                .destroy()
                .then(() =>
                    res.status(200).json({ message: 'Publication supprimée !' })
                )
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error: error.message }))
};

// Modifier un post
exports.updatePost = (req, res, next) => {
    const postObject = req.file ?
        {
            ...JSON.parse(req.body.Post),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Publication modifiée !' }))
        .catch(error => res.status(400).json({ error }));
};

// Récupérer un post
exports.getOnePost = (req, res, next) => {
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
    Post.find()
        .then(Posts => res.status(200).json(Posts))
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
};