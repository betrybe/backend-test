/* eslint-disable no-useless-escape */
/* eslint-disable arrow-body-style */
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { addUser, findAllUsers, findUserById } = require('../controllers/userControllers');
const { userValidation } = require('../services/joiValidation');
const UserModel = require('../models');

//Sequelize mocking ref: https://medium.com/@kvr2277/sequelize-mocking-with-jest-and-node-933c1f439579

const mockRequest = (params) => {
  return {
    body: { ...params },
  };
};

const mockRequestParams = (params) => {
  return {
    params: { ...params },
  };
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

// afterEach(() => {
//   jest.resetModules() 
// });    


jest.mock('../models/UserModel', () => () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  return dbMock.define('Users', { 0: [{
    id: 9999999999,
    createdAt: '2020-10-05T16:57:15.313Z',
    displayName: 'Mateus Talles Teste',
    email: 'user630@gma',
    image: '',
    password: 'testestest',
    updatedAt: '2020-10-05T16:57:15.313Z',
  },
  {
    id: 99999999996,
    createdAt: '2020-10-05T16:57:15.313Z',
    displayName: 'Mateus Talles',
    email: 'user631@gma',
    image: '',
    password: 'testestest',
    updatedAt: '2020-10-05T16:57:15.313Z',
  },
  {
    id: 99999999997,
    displayName: 'Mateus Talles',
    email: 'user61234@gma',
    image: '',
    password: 'testestest',
  }],
  });
});


const createUserRequest = async (params) => userValidation.validateAsync(params);

describe('User creation tests', () => {
  it('doesnt create users with empty params', () => {
    expect.assertions(1);
    return createUserRequest({})
      .then(() => null)
      .catch((err) => {
        expect(err.details[0].message).toBe('\"displayName\" is required');
      });
  });

  it('doesnt create users without displayName', () => {
    expect.assertions(1);
    return createUserRequest({ displayName: 'Mateus Talles' })
      .then(() => null)
      .catch((err) => {
        expect(err.details[0].message).toBe('\"email\" is required');
      });
  });

  it('doesnt create users without password', () => {
    expect.assertions(1);
    return createUserRequest({ displayName: 'Mateus Talles', email: 'mateustalles@gma' })
      .then(() => null)
      .catch((err) => {
        expect(err.details[0].message).toBe('\"password\" is required');
      });
  });

  it('creates users with proper params', async () => {
    expect.assertions(2);

    const mockData = {
      displayName: 'Mateus Talles',
      email: 'user61234234@gma',
      password: 'testestest',
    };

    const req = mockRequest(mockData);
    const next = jest.fn();
    const res = mockResponse();

    const spyDB = jest.spyOn(UserModel.Users, 'create');

    await addUser(req, res, next); // <= await the Promise

    expect(spyDB).toHaveBeenCalled(); // Success!

    const userData = await Promise.resolve(spyDB.mock.results[0].value);

    expect(userData.dataValues).toMatchObject(mockData); // Success!
  });
});

describe('Finding Users test', () => {
  it('should return all users', async () => {
    expect.assertions(2);

    const mockResult = [{
      id: 9999999999,
      createdAt: '2020-10-05T16:57:15.313Z',
      displayName: 'Mateus Talles Teste',
      email: 'user630@gma',
      image: '',
      password: 'testestest',
      updatedAt: '2020-10-05T16:57:15.313Z',
    },
    {
      id: 99999999996,
      createdAt: '2020-10-05T16:57:15.313Z',
      displayName: 'Mateus Talles',
      email: 'user631@gma',
      image: '',
      password: 'testestest',
      updatedAt: '2020-10-05T16:57:15.313Z',
    },
    {
      id: 99999999997,
      displayName: 'Mateus Talles',
      email: 'user61234@gma',
      image: '',
      password: 'testestest',
    }];

    const req = mockRequest({});
    const next = jest.fn();
    const res = mockResponse();

    const spyDB = jest.spyOn(UserModel.Users, 'findAll');
    await findAllUsers(req, res, next); // <= await the Promise

    expect(spyDB).toHaveBeenCalled(); // Success!

    const userData = await Promise.resolve(spyDB.mock.results[0].value);

    expect(userData[0].dataValues[0]).toEqual(expect.arrayContaining(mockResult)); // Success!
  });

  it('should return only user with the proper id', async () => {
    await axios({
      baseURL: 'http://localhost:3000/user/401465483996',
      headers: { Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo0MDE0NjU0ODQxMDAsImRpc3BsYXlOYW1lIjoiTWF0ZXVzIFRhbGxlcyIsImVtYWlsIjoidXNlcjYxMjM0MjMyQGdtYSIsInBhc3N3b3JkIjoidGVzdGVzdGVzdCIsImltYWdlIjoiIn0sImlhdCI6MTYwMTkzMDE5MywiZXhwIjoxNjAxOTQwOTkzfQ.MG52j3gZlfL9VC7jt0LHqb-U4sGLcgU8Kg7AovNDlAc' },
      method: 'GET',
    }).then((data) => expect(data.data).toEqual({
      id: 401465483996,
      displayName: 'Brett Wiltshire',
      email: 'brett@email.com',
      password: '123456',
      image: 'http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png',
    }));
  });
});
