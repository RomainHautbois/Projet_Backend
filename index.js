const express = require('express');
const app = express();
const port = 3000;


// Importer la configuration Sequelize
const sequelize = require('./config/db');

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

const authRoutes = require('./routes/authRouter');
app.use('/auth', authRoutes);

// Synchroniser la base de données et démarrer le serveur HTTP
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Serveur démarré sur le port ${port}`);
    });
}).catch(err => {
    console.error(err);
});