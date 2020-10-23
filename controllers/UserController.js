const { Router } = require('express');

const router = Router();
const services = require('../services');

router.post('/', async (req, res) => {
  const payload = req.body;
  const teste = await services.UserServices.CreateUser(payload);
  console.log('teste', teste);
});

module.exports = router;
