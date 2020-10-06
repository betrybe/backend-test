require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const userRouter = require('./routers/userRouter');
const CustomError = require('./services/errorScheme');
const postsRouter = require('./routers/postsRouter');
const { login } = require('./controllers/userControllers');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRouter);

app.use('/post', postsRouter);

app.post('/login', login);

app.use(rescue.from(
  CustomError,
  (err, req, res, next) => {
    const { message: { message, code } } = err;
    console.log(message, code);
    res.status(code).send({ error: message });
    next();
  },
));

app.use((err, req, res, next) => {
  res.status(500).send({ error: { message: err.message, code: 500 } });
  next();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
