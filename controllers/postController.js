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

/*
endpoint Get autenticado com token JWT válido, que retorna um array de objetos
com todos os posts
retorno
[
    {
        "id": 1,
        "title": "Post do Ano",
        "content": "Melhor post do ano",
        "userId": 1,
        "published": "2011-08-01T19:58:00.000Z",
        "updated": "2011-08-01T19:58:51.000Z",
        "user": {
            "id": 1,
            "displayName": "Lewis Hamilton",
            "email": "lewishamilton@gmail.com",
            "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
        }
    }
]
 */
const getAllPosts = rescue(async (req, res) => {
  /*
  do sequelize utilizo o include para simular o join com a tabela users e o
  attributes exclude para não retornar o password como visto na aula
  */
  const allPosts = await Posts.findAll({ include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }] });

  res.status(200).json(allPosts);
});

/*
endpoint Get onde envio um token JWT válido e que retorna um post específico
com informações do post e do usuário que escreveu o post
*/
const getPostById = rescue(async (req, res) => {
  // preciso utilizar o [0] para que retorno o primeiro objeto do array
  const getPostedById = (await Posts.findAll({ where: { id: req.params.id }, include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }] }))[0];
  // console.log(getPostedById);

  if (!getPostedById) {
    res.status(404).json({ message: 'Post não existe' });
  }
  res.status(200).json(getPostedById);
});

/*
endpoint Put para editar um post específico onde só o usuário que criou o post pode editá-lo.
envio
{
    "title":"Notícia relevante para as eleições",
    "content":"Contéudo completo sobrea as eleições"
}
retorno
{
    "title": "Notícia relevante para as eleições",
    "content": "Contéudo completo sobrea as eleições",
    "userId": 1
}
*/
const updatePost = rescue(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const getPostedById = (await Posts.findAll({ where: { id }, include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }] }))[0];
  const { user: { id: userId } } = getPostedById;
  const { user: { email } } = req;
  const { id: uId } = (await Users.findAll({ where: { email } }))[0];

  if (userId !== uId) return res.status(401).json({ message: 'Usuário não autorizado' });
  const isPostValid = validatePost(title, content);

  if (isPostValid) return res.status(isPostValid.code).json({ message: isPostValid.message });
  Posts.update({ title, content }, { where: { id } })
    .then(() => res.status(200).json({ title, content, userId: uId }));
});

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};
