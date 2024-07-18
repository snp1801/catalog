const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors()); // This will allow all CORS requests

// Route to GET all products
app.get('/api/products', (req, res) => {
    fs.readFile('products.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading products data.');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});