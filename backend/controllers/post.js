// Importe fs
const fs = require('fs'),

// Import model
const { Post } = require('./models/index');

// Créer un post
exports.createPost = (req, res, next) => {
    const PostObject = JSON.parse(req.body.post);
    delete PostObject._id;
    const post = new Post({
        ...PostObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        usersLiked: [],
    });
    // Sauvegarde post dans la base de donnée
    post.save()
        .then(() => res.status(201).json({ message: 'Publication enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
};

// Supprimer un post
exports.deletePost = (req, res, next) => {
    // Récupère le post de la base de données via son id
    Post.findOne({ _id: req.params.id })
        .then(Post => {
            const filename = Post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Publication supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

// Modifier un post
exports.updatePost = (req, res, next) => {
    Post.findOne({
        where: { id: req.params.id }
    }).then(post => {
        if (post.userId == req.token.userId) {
            const postObject = req.file ?
                {
                    ...JSON.parse(req.body.Post),
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                } : { ...req.body };
            // Récupère le post et on le met à jour en cherchant le post via son id
            Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Publication modifiée !' }))
                .catch(error => res.status(400).json({ error }));
        } else {
            res.status(403).json({ message: "Vous n'avez pas le droit de modifier ce post" })
        }
    })

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