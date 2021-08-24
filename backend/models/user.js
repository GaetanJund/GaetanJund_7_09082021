// Import Sequelize + connexion base de données
const DataTypes = require('sequelize');
const database = require('./connexion');

// Défini dans la base Sequelize 'User', pour model dans la base
const User = database.define('User', {
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

module.exports = User;