/* eslint-disable no-useless-escape */
/* eslint-disable arrow-body-style */
const axios = require('axios');
const { addUser } = require('../controllers/userControllers');

const mockRequest = (params) => {
  return {
    body: { ...params },
  };
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const createUserRequest = async (params) => axios({
  baseURL: 'http://localhost:3000/user',
  method: 'POST',
  data: params,
});

describe('User creation tests', () => {
  it('doesnt create users with empty params', () => {
    expect.assertions(2);
    return createUserRequest()
      .then(() => null)
      .catch((err) => {
        expect(err.response.status).toBe(400);
        expect(err.response.data.error.message).toBe('\"displayName\" is required');
      });
  });

  it('doesnt create users without displayName', () => {
    expect.assertions(2);
    return createUserRequest({ displayName: 'Mateus Talles' })
      .then(() => null)
      .catch((err) => {
        expect(err.response.status).toBe(400);
        expect(err.response.data.error.message).toBe('\"email\" is required');
      });
  });

  it('doesnt create users without password', () => {
    expect.assertions(2);
    return createUserRequest({ displayName: 'Mateus Talles', email: 'mateustalles@gma' })
      .then(() => null)
      .catch((err) => {
        expect(err.response.status).toBe(400);
        expect(err.response.data.error.message).toBe('\"password\" is required');
      });
  });

  it('creats users with proper params', () => {
    expect.assertions(2);
    const addUserMock = jest.fn(addUser);
    const randomNumber = Math.floor(Math.random() * 1000);
    const req = mockRequest({ displayName: 'Mateus Talles', email: `user${randomNumber}@gma`, password: 'testestest' });
    const res = mockResponse();
    const next = jest.fn();
    return addUserMock(req, res, next).then(() => {
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith('token');
    })
      .catch((err) => console.error(err));
  });
});
