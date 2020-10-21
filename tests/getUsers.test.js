const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';

describe('Sua aplicação deve ter o endpoint GET `/user`', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    shell.exec('npx sequelize-cli db:seed:all $');
  });

  it('Será validado que é possível listar todos os usuários', async () => {
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
      .get(`${url}/user`)
      .expect('status', 200)
      .then((responseSales) => {
        const { json } = responseSales;
        const firstUser = json[0];
        const secondUser = json[1];
        expect(firstUser.displayName).toBe('Lewis Hamilton');
        expect(firstUser.email).toBe('lewishamilton@gmail.com');
        expect(firstUser.image).toBe('https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg');
        expect(secondUser.displayName).toBe('Michael Schumacher');
        expect(secondUser.email).toBe('MichaelSchumacher@gmail.com');
        expect(secondUser.image).toBe('https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg');
      });
  });

  it('Será validado que não é possível listar usuários sem o token na requisição', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/user`)
      .expect('status', 401)
      .then((responseSales) => {
        const { json } = responseSales;
        expect(json.message).toBe('Token não encontrado');
      });
  });

  it('Será validado que não é possível listar usuários com o token inválido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 'mo3183bfbahaf',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/user`)
      .expect('status', 401)
      .then((responseSales) => {
        const { json } = responseSales;
        expect(json.message).toBe('Token expirado ou inválido');
      });
  });
});
