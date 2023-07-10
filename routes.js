// routes.js
const express = require('express');
const peliasConfig = require('pelias-config').generate();
const pelias = require('pelias-client');

const app = express();

app.use(express.json());

app.post('/geocode', (req, res) => {
    const address = req.body.address;

    const client = pelias(peliasConfig);

    client.search(address, (err, results) => {
        if (err) {
            console.error('Erreur lors de la recherche de géocodage :', err);
            return res.status(500).json({ error: 'Erreur de géocodage' });
        }

        const formattedResults = results.features.map(result => ({
            // Extraire les informations pertinentes de chaque résultat
            latitude: result.geometry.coordinates[1],
            longitude: result.geometry.coordinates[0],
            nomRue: result.properties.street,
            ville: result.properties.city,
            // ...
        }));

        return res.json(formattedResults);
    });
});

app.listen(3000, () => {
    console.log('Serveur en cours d\'exécution sur le port 3000');
});