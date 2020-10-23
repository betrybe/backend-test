const express = require('express');
const userController = require('./controller/userController');

const app = express();
app.use(express.json());
// Caso contrário ele não irá processar as requests com jsons no body

app.listen(3000, () => console.log('Ouvindo porta 3000!'));
app.get('/', (_req, response) => response.send());

app.post('/user', userController.insertUser);
