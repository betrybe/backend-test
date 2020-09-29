const rescue = require('express-rescue');
const { userValidation } = require('../services/joiValidation');
const { CommonError } = require('../services/errorScheme');
const { UserModel } = require('../models');


const addUser = rescue(async (req, res) => {
  const { body } = req;
  console.log(body, typeof body);
  return userValidation.validateAsync(body)
    .then(async () => {
      res.send('sucess');
    })
    .catch((err) => {
      throw new CommonError(err.message, err.status);
    });
});

module.exports = {
  addUser,
};
