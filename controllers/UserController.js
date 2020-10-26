const { Router } = require('express');
const { Users } = require('../models');
const { authClient } = require('../middleware/auth');

const user = Router();

const verificarData = ({displayName, email, password, image}) => {
    const error = {isError: false};    
     if (displayName && displayName.length <= 8 ) {
       error.isError = true;
       error.message = '"\displayName"\ length must be at least 8 characters long'; 
       return error;
     }
     return error;
   }
user.post('/', (req, res) => 
{  const verifyData = verificarData(req.body);
    if(verifyData.isError) {
     return res.status(400).send(verifyData);
    }
   return res.status(201).send(req.token);
});

user.get('/', authClient(), (req, res) => {
    Users.findAll().then((users) => console.log(users));
    res.status(401).send(req.body.token);
  });
module.exports = user;
