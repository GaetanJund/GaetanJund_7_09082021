// Import model
const { Post, User, Comments } = require('../models/index');

// Créer un commentaire
exports.addComment = (req, res, next) => {
    const comment = new Comments(
        {
            message: req.body.message,
            user_id: req.token.userId,
            post_id: req.body.postId
        }
    )
    comment.save()
        .then(() => res.status(201).json({ message: "Commentaire ajouté !" }))
        .catch(error => res.status(400).json({ error }))
}

// Modifier un commentaire
exports.updateComment = (req, res, next) => {
    Comments.findOne({
        where: {
            _id: req.params.id
        }
    }).then(
        (comments) => {
            if (comments.user_id == req.token.userId || req.token.isAdmin) {
                Comments.update({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: "Commentaire modifié !" }))
                    .catch(error => res.status(400).json({ error }))
            } else {
                res.status(403).json({ message: "Vous n'avez pas les droits pour modifier le commentaire" })
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

// Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    Comments.findOne({
        where: {
            _id: req.params.id
        }
    }).then(
        (comments) => {
            if (comments.user_id == req.token.userId || req.token.isAdmin) {
                Comments.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
                    .catch(error => res.status(400).json({ error }))
            } else {
                res.status(403).json({ message: "Vous n'avez pas les droits pour supprimer le commentaire" })
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

// // Récupérer un commentaire
exports.getOneComment = (req, res, next) => {
    // Récupère le post via son id
    Comments.findOne({
        _id: req.params.id
    }).then(
        (Comment) => {
            res.status(200).json(Comment);
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
exports.getAllComment = (req, res, next) => {
    Comments.findAll()
        .then(Comment => res.status(200).json(Comment))
        .catch(error => res.status(400).json({ error }));
};