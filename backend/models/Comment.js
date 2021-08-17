// Import Sequelize + connexion base de données
const DataTypes = require('sequelize');
const database = require('./connexion');

// Défini dans la base Sequelize 'Comments', pour model dans la base
const Comments = database.define('Comments', {
    massage: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Comments;