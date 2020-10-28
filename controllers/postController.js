const rescue = require('express-rescue');
const { Posts } = require('../models');
const { Users } = require('../models');

const validatePost = (title, content) => {
  if (!title) {
    return { code: 400, message: '"title" is required' };
  }
  if (!content) {
    return { code: 400, message: '"content" is required' };
  }
};

/*
endpoint para criar um post no blog, é necessário estar autenticado com um token JWT válido
envio
{
    "title":"Notícia relevante para as eleições",
    "content":"Contéudo completo sobrea as eleições"
}
retorna
{
    "title": "Notícia relevante para as eleições",
    "content": "Contéudo completo sobrea as eleições",
    "userId": 1
}
*/
const createPost = rescue(async (req, res) => {
  const { title, content } = req.body;
  const { user: { email } } = req;

  const isPostValid = validatePost(title, content);
  console.log('isPostValid', isPostValid);
  if (isPostValid) {
    return res.status(isPostValid.code)
      .json({ message: isPostValid.message });
  }

  // aqui preciso pegar [0] porque o sequelize retorna um array de objetos
  const { id: userId } = (await Users.findAll({ where: { email } }))[0];

  Posts.create({ title, content, userId, published: new Date(), updated: new Date() })
    .then(() => res.status(201).json({ title, content, userId }));
});

module.exports = {
  createPost,
};
