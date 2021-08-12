// Importe package express + body-parser
const express = require('express');
const bodyParser = require('body-parser');
const { loadModel } = require('./models/index.js');

// // Routes vers utilisateurs et publications
// const userRoutes = require('./routes/users');
// const publicationRoutes = require('./routes/publications');

// Application va tourner avec express
const app = express();

// Connexion à Sequelize (base de donnée)
loadModel();

// Middleware Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS, afin que tout le monde puisse faire des requetes depuis son navigateur
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

// Rendre requête exploitable
app.use(express.urlencoded({
    extended: true
}));

// // Routes vers utilisateurs
// app.use('/api/auth', userRoutes);
// // Routes vers produits
// app.use('/api/publication', publicationRoutes);

module.exports = app;