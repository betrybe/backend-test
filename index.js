// const app = require('./app');

// app.factory()
//   .then((appInstance) => {
//     const PORT = process.env.PORT || 3000;
//     appInstance.listen(PORT, () => console.log('ouvindo porta', PORT));
//   })
//   .catch((err) => {
//     console.error(err);
//     process.exit(8);
//   });
const express = require('express');

const Routes = require('./apresentation/controllers');

const app = express();
app.use(express.json());

app.use('/user', Routes.user);
app.use('/login', Routes.login);
app.use('/post', Routes.post);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.get('/', (request, response) => response.send());
