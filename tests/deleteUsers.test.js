const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';

describe('Sua aplicação deve ter o endpoint DELETE `/user/me`', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    shell.exec('npx sequelize-cli db:seed:all $');
  });

  it('Será validado que é possível excluir meu usuário com sucesso', async () => {
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
      .delete(`${url}/user/me`)
      .expect('status', 204);
  });

  it('Será validado que não é possivel excluir meu usuário com token inválido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 'nhfur53sbyf84',
            'Content-Type': 'application/json',
          },
        },
      })
      .delete(`${url}/user/me`)
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Token expirado ou inválido');
      });
  });

  it('Será validado que não é possivel excluir meu usuário sem o token', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .delete(`${url}/user/me`)
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Token não encontrado');
      });
  });
});
