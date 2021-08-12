// Import Sequelize + connexion base de données
const DataTypes = require('sequelize');
const database = require('./connexion');

// Défini dans la base Sequelize 'User', pour model dans la base
const User = database.define('User', {
    email : {
        type : DataTypes.STRING,
        allowNull : false, 
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    }
});

module.exports = User;