const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';

describe('Sua aplicação deve ter o endpoint POST `/user`', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
  });

  it('Será validado que é possível cadastrar um usuário com sucesso', async () => {
    await frisby
      .post(`${url}/user`,
        {
          displayName: 'Rubinho Barrichello',
          email: 'rubinho@gmail.com',
          password: '123456',
          image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
        })
      .expect('status', 201)
      .then((response) => {
        const { json } = response;
        expect(json.token).not.toBeNull();
      });
  });

  it('Será validado que não é possível cadastrar usuário com o campo `displayName` menor que 8 caracteres', async () => {
    await frisby
      .post(`${url}/user`,
        {
          displayName: 'Rubinho',
          email: 'rubinho@gmail.com',
          password: '123456',
          image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"displayName" length must be at least 8 characters long');
      });
  });

  it('Será validado que não é possível cadastrar usuário com o campo `email` com formato `email: rubinho`', async () => {
    await frisby
      .post(`${url}/user`,
        {
          displayName: 'Rubinho Barrichello',
          email: 'rubinho',
          password: '123456',
          image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"email" must be a valid email');
      });
  });

  it('Será validado que não é possível cadastrar usuário com o campo `email` com formato `email: @gmail.com`', async () => {
    await frisby
      .post(`${url}/user`,
        {
          displayName: 'Rubinho Barrichello',
          email: '@gmail.com',
          password: '123456',
          image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"email" must be a valid email');
      });
  });

  it('Será validado que o campo `email` é obrigatório', async () => {
    await frisby
      .post(`${url}/user`,
        {
          displayName: 'Rubinho Barrichello',
          password: '123456',
          image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"email" is required');
      });
  });

  it('Será validado que não é possível cadastrar usuário com o campo `password` menor que 6 caracteres', async () => {
    await frisby
      .post(`${url}/user`,
        {
          displayName: 'Rubinho Barrichello',
          email: 'rubinho@gmail.com',
          password: '12345',
          image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"password" length must be 6 characters long');
      });
  });

  it('Será validado que o campo `password` é obrigatório', async () => {
    await frisby
      .post(`${url}/user`,
        {
          displayName: 'Rubinho Barrichello',
          email: 'rubinho@gmail.com',
          image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"password" is required');
      });
  });

  it('Validar que não é possível cadastrar um usuário com email já existente', async () => {
    await frisby
      .post(`${url}/user`,
        {
          displayName: 'Rubinho Barrichello',
          email: 'rubinho@gmail.com',
          password: '123456',
          image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
        })
      .expect('status', 201);

    await frisby
      .post(`${url}/user`,
        {
          displayName: 'Rubinho Barrichello',
          email: 'rubinho@gmail.com',
          password: '123456',
          image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
        })
      .expect('status', 409)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Usuário já existe');
      });
  });
});
