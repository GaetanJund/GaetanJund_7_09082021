// Importer jwt
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Import model
const { User } = require('../models/index');

require('dotenv').config()

// Enregistrements de nouveau utilisateurs
exports.signup = (req, res, next) => {
    // fonction crypter un mot de passe
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Création d'un nouvel User
            const user = new User({
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                password: hash
            });
            // Enregistrer l'utilisateur dans la base de données
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Connexion des utilisateurs existants
exports.login = (req, res, next) => {
    // Récupère l'utilisateur de la base de données via son email
    User.findOne({
        where: { email: req.body.email },
    })
        .then(user => {
            // Si on a pas trouvé de user
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé !' });
            }
            // Compare le mot de passe entré avec celui présent dans la base de donnée
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    // Si mot de passe n'est pas bon, on renvoi un message
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        isAdmin: user.isAdmin,
                        token: jwt.sign(
                            { userId: user.id, isAdmin: user.isAdmin },
                            process.env.TOKEN_KEY,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ message: error }));
        })
        .catch(error => res.status(500).json({ message: error }));
};

// Supprimer un compte
exports.deleteUser = (req, res, next) => {
    User.destroy({
        where: { id: req.params.id },
    })
        .then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
        .catch((err) => res.status(400).json({ err }));
};

// Mettre à jour un compte
exports.updateUser = (req, res, next) => {
    User.update(
        {
            nom: req.body.nom,
            prenom: req.body.prenom
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((user) =>
            res.status(201).json({ message: "Utilisateur modifié ! !" })
        )
        .catch((error) => res.status(500).json(error));
};

//Récupère tous les Users
exports.getAllUsers = (req, res, next) => {
    User.findAll()
        .then((users) => res.status(200).json({ users }))
        .catch((err) => res.status(401).json({ err }));
};

// Récupère un User
exports.getOneUser = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodedToken.userId;
    User.findOne({
        where: {
            id: userId,
        },
    })
        .then((user) => res.status(200).json({ user }))
        .catch((err) => res.status(401).json({ err }));
};