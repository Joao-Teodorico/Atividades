const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(express.static('public')); // Serve os arquivos front-end


app.post('/api/formulario', (req, res) => {
    console.log('Dados recebidos:', req.body);
    res.status(200).send('Dados recebidos com sucesso.');
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
