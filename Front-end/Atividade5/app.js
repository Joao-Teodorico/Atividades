const express = require('express');
const app = express();
const port = 3000;


app.get('/products', (req, res) => {
 const products = [
   { id: 1, name: 'Notebook', price: 2500 },
   { id: 2, name: 'Smartphone', price: 1500 }
 ];
 res.json(products);
});


app.listen(port, () => {
 console.log(`API is running on http://localhost:${port}`);
});

