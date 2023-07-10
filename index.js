// index.js
const express = require('express');
const app = express();
const routes = require('./routes'); // Importer le fichier routes.js

app.use(express.json());
app.use(routes); // Utiliser le fichier routes.js comme middleware

app.listen(3000, () => {
  console.log('Serveur en cours d\'exécution sur le port 3000');
});