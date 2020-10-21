const bodyParser = require('body-parser');
const express = require('express');
const rescue = require('express-rescue');
const { User } = require('./models');

const app = require('./app');

const config = { port: 3000 };

app
  .factory()
  .then((appInstance) => {
    appInstance.listen(config.port, () => {
      console.log(`Ouvindo na porta ${config.port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// const app = express();
// app.use(bodyParser.json())

// app.post('/user', rescue(async(req, res, next) => {
//   console.log(req.body)
//   const userInfo = await User.create(req.body)
//   return res.send(userInfo)
// }))
// app.get('/user', rescue(async(req, res, next) => {
//   const usersInfo = await User.findAll()
//   return res.send(usersInfo)
// }))
// app.use((err, req, res, _next) => {
//   console.log(err.message)
//   return err && res.status(500).json({ message: 'Internal Error' });
// });
// app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
