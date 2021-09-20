// Importe package express + body-parser
const express = require('express');
const path = require('path');
const { loadModel } = require('./models/index');

// Routes vers utilisateurs, publications et comment
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

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
app.use(express.json());

// Routes vers utilisateurs
app.use('/api/auth', userRoutes);
// Routes vers posts
app.use('/api/post', postRoutes);
// Routes vers commentaires
app.use('/api/comment', commentRoutes);
// Gestionnaire de routage images
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;