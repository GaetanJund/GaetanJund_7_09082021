// Importer jwt
const jwt = require('jsonwebtoken');

// Import model
const { User } = require('./models/index');

require('dotenv').config()

// Enregistrements de nouveau utilisateurs
exports.signup = (req, res, next) => {
    User.create({
        prenom: req.body.prenom,
        nom: req.body.nom,
        email: req.body.email,
        password: req.body.password
    })
        .then(user => res.status(201).json(newToken(user)))
        .catch(error => res.status(401).json({ error: error }))
};

// Connexion des utilisateurs existants
exports.login = (req, res, next) => {
    // Récupère l'utilisateur de la base de données via son email
    User.find({ email: req.body.email })
        .then(user => {
            // Si on a pas trouvé de user
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            // Compare le mot de passe entré avec celui présent dans la base de donnée
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    // Si mot de passe n'est pas bon, on renvoi un message
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.TOKEN_KEY,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Supprimer un compte
exports.deleteAccount = (req, res, next) => {
    // Récupérer l'utilisateur de la base de donnée via son email
    User.find({ email: req.body.email, password: req.body.password })
        .then(user => {
            // Si on a pas trouvé de user
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            } else {
                // on supprime le compte
                User.delete({ id: id })
                res.status(200).json({ messageRetour: "Utilisateur supprimé" })
            }
        }
        );
};

// Mettre à jour un compte
exports.updateAccount = (req, res, next) => {
    try {
        const userObject = req.file
            ? {
                ...JSON.parse(req.body.user),
                imageUrl: `${req.protocol}://${req.get('host')}/public/${req.file.filename
                    }`
            }
            : { ...req.body }
        req.user.update(userObject).then(user => res.status(200).json({ user }))
    } catch (error) {
        res.status(400).json({ error })
    }
}
