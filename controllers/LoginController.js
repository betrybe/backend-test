const { Router } = require('express');
const { authClient } = require('../middleware/auth');

const login = Router();



const tokenVerify = (token) => { 

}

login.post('/', authClient(), (req, res) => {

  res.status(201).send(req.body.token);
});


module.exports = login;
