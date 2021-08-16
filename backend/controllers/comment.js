// Import model
const { Comments } = require('./models/index');

// Créer un commentaire
exports.addComment = async (req, res, next) => {
    try {
        let comment = await Comments.create({
            ...req.body,
            postId: req.params.postId,
            userId: req.user.id
        })

        comment = await Comments.findOne({
            where: { id: comment.id },
            include: db.User
        })

        res.status(201).json({ comment })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }
};

// Modifier un commentaire
exports.updateComment = (req, res, next) => {
    Comments.findOne({
        where: { id: req.params.id, userId: req.user.id },
        include: db.User
    }).then(comment => {
        if (!comment) {
            res.status(400).json({ error: "Vous n'avez pas l'autorisation" })
        } else {
            comment
                .update(req.body)
                .then(comment => res.status(200).json({ comment }))
        }
    })
};

// Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    const where = {
        id: req.params.id
    }

    if (!req.user.admin) {
        where.userId = req.user.id
    }

    Comments.findOne({ where })
        .then(comment => {
            if (!comment) {
                res.status(400).json({ error: "Vous n'avez pas l'autorisation" })
            }
            comment
                .destroy()
                .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error: error.message }))
};