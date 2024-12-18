const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const products = [
  { id: 1, name: 'Notebook', price: 2500 },
  { id: 2, name: 'Smartphone', price: 1500 }
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/products', (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length + 1;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
