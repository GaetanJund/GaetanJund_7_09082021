// Import model
const { Comments } = require('../models/index');

// Créer un commentaire
exports.addComment = (req, res, next) => {
    const CommentObject = JSON.parse(req.body.comment);
    delete CommentObject._id;
    const comment = new Comment({
        ...CommentObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    // Sauvegarde le commentaire dans la base de données
    comment.save()
        .then(() => res.status(201).json({ message: 'Publication enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
};

// Modifier un commentaire
exports.updateComment = (req, res, next) => {
    // Trouver le commentaire concerné dans la base de donnée
    Comments.findOne({
        where: { id: req.params.id, userId: req.user.id },
        include: db.User
    }).then(comment => {
        // Si ce n'est pas un commentaire fait par l'utilisateur -> pas d'autorisation
        if (!comment) {
            res.status(400).json({ error: "Vous n'avez pas l'autorisation" })
        }
        // Si commentaire de l'utilisateur -> update body (commentaire) 
        else {
            comment
                .update(req.body)
                .then(comment => res.status(200).json({ comment }))
        }
    })
};

// Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    // Trouver le commentaire concerné dans la base de donnée
    Comments.findOne({ where })
        .then(comment => {
            // Si ce n'est pas un commentaire fait par l'utilisateur -> pas d'autorisation 
            if (!comment) {
                res.status(400).json({ error: "Vous n'avez pas l'autorisation" })
            }
            // Si commentaire est trouvé -> commentaire destroy (supprimé)
            else {
                comment
                    .destroy()
                    .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
                    .catch(error => res.status(400).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ error: error.message }))
};