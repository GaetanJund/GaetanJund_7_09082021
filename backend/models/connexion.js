// Import Sequelize et dotenv
const Sequelize = require('sequelize');
require('dotenv').config();

// Mise en place de datebase pour authentification à Sequelize
const database = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, { host: process.env.DB_HOST, dialect: 'mysql' });
database.authenticate()
    .then(() => console.log('Connexion réussie'))
    .catch(() => console.log('Connexion échouée'));

module.exports = database;