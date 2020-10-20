const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';

describe('Sua aplicação deve ter o endpoint GET `post/search?q=:searchTerm`', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop $');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    shell.exec('npx sequelize-cli db:seed:all $');
  });

  it('Será validado que é possível buscar um blogpost pelo `title`', async () => {
    let token;
    await frisby
      .post(`${url}/login`,
        {
          email: 'lewishamilton@gmail.com',
          password: '123456',
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/post/search?q=Vamos que vamos`)
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result[0].id).toBe(2);
        expect(result[0].title).toBe('Vamos que vamos');
        expect(result[0].content).toBe('Foguete não tem ré');
        expect(result[0].published).toBe('2011-08-01T19:58:00.000Z');
        expect(result[0].updated).toBe('2011-08-01T19:58:51.000Z');
        expect(result[0].user.id).toBe(1);
        expect(result[0].user.displayName).toBe('Lewis Hamilton');
        expect(result[0].user.email).toBe('lewishamilton@gmail.com');
        expect(result[0].user.image).toBe('https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg');
      });
  });

  it('Será validado que é possível buscar um blogpost pelo `content`', async () => {
    let token;
    await frisby
      .post(`${url}/login`,
        {
          email: 'lewishamilton@gmail.com',
          password: '123456',
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/post/search?q=Foguete não tem ré`)
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result[0].id).toBe(2);
        expect(result[0].title).toBe('Vamos que vamos');
        expect(result[0].content).toBe('Foguete não tem ré');
        expect(result[0].published).toBe('2011-08-01T19:58:00.000Z');
        expect(result[0].updated).toBe('2011-08-01T19:58:51.000Z');
        expect(result[0].user.id).toBe(1);
        expect(result[0].user.displayName).toBe('Lewis Hamilton');
        expect(result[0].user.email).toBe('lewishamilton@gmail.com');
        expect(result[0].user.image).toBe('https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg');
      });
  });

  it('Será validado que é possível buscar todos os blogpost quando passa a busca vazia', async () => {
    let token;
    await frisby
      .post(`${url}/login`,
        {
          email: 'lewishamilton@gmail.com',
          password: '123456',
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/post/search?q=`)
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        const firstBlogPost = result[0];
        const secondBlogPost = result[1];
        expect(firstBlogPost.id).toBe(1);
        expect(firstBlogPost.title).toBe('Post do Ano');
        expect(firstBlogPost.content).toBe('Melhor post do ano');
        expect(firstBlogPost.published).toBe('2011-08-01T19:58:00.000Z');
        expect(firstBlogPost.updated).toBe('2011-08-01T19:58:51.000Z');
        expect(firstBlogPost.user.id).toBe(1);
        expect(firstBlogPost.user.displayName).toBe('Lewis Hamilton');
        expect(firstBlogPost.user.email).toBe('lewishamilton@gmail.com');
        expect(firstBlogPost.user.image).toBe('https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg');

        expect(secondBlogPost.id).toBe(2);
        expect(secondBlogPost.title).toBe('Vamos que vamos');
        expect(secondBlogPost.content).toBe('Foguete não tem ré');
        expect(secondBlogPost.published).toBe('2011-08-01T19:58:00.000Z');
        expect(secondBlogPost.updated).toBe('2011-08-01T19:58:51.000Z');
        expect(secondBlogPost.user.id).toBe(1);
        expect(secondBlogPost.user.displayName).toBe('Lewis Hamilton');
        expect(secondBlogPost.user.email).toBe('lewishamilton@gmail.com');
        expect(secondBlogPost.user.image).toBe('https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg');
      });
  });

  it('Será validado que é possível buscar um blogpost inexistente e retornar array vazio', async () => {
    let token;
    await frisby
      .post(`${url}/login`,
        {
          email: 'lewishamilton@gmail.com',
          password: '123456',
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/post/search?q=Não existe`)
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result).toStrictEqual([]);
      });
  });

  it('Será validado que não é possível buscar um blogpost sem o token', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/post/search?q=vamos que vamos`)
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Token não encontrado');
      });
  });

  it('Será validado que não é possível buscar um blogpost com o token inválido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 'g4twg',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/post/search?q=vamos que vamos`)
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Token expirado ou inválido');
      });
  });
});
