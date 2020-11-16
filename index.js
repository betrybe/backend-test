const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/user', routes.userRouter);
app.use('/login', routes.loginRouter);
app.use('/post', routes.postRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use((err, _req, res, _next) => {
  console.log(err);
  if (err.parent.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'Usuário já existe' });
  return res.status(500).json({ message: 'internal error' });
});
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});