// Import Sequelize + Connexion
const DataTypes = require('sequelize');
const database = require('./connexion');

// Défini dans la base Sequelize 'Post', sauvegarde d'un post dans la base de donnée
const Post = database.define('Post', {
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Post;