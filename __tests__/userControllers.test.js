/* eslint-disable no-useless-escape */
/* eslint-disable arrow-body-style */

const { addUser } = require('../controllers/userControllers');
const { userValidation } = require('../services/joiValidation');
const UserModel = require('../models');

jest.mock('../models/UserModel', () => () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  return dbMock.define('Users', {
    id: 9999999999,
    createdAt: '2020-10-05T16:57:15.313Z',
    displayName: 'Mateus Talles',
    email: 'user630@gma',
    image: '',
    password: 'testestest',
    updatedAt: '2020-10-05T16:57:15.313Z',
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

  it('creats users with proper params', () => {
    expect.assertions(1);

    const mockResult = {
      id: 9999999999,
      createdAt: '2020-10-05T16:57:15.313Z',
      displayName: 'Mateus Talles',
      email: 'user630@gma',
      image: '',
      password: 'testestest',
      updatedAt: '2020-10-05T16:57:15.313Z',
    };

    const mockData = {
      displayName: 'Mateus Talles',
      email: 'user630@gma',
      password: 'testestest',
    };

    return UserModel.Users.create(mockData).then((data) => {
      expect(data.dataValues).toStrictEqual(mockResult);
    })
      .catch((err) => {
        console.error(err);
      });
  });
});
