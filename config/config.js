require('dotenv/config');

module.exports = {
  development: {
    username: 'root',
    password: 'password',
    database: 'blogs_api',
    host: 'localhost',
    dialect: 'mysql',
  },
  test: {
    username: process.env.MYSQL_USER,
    password: 'password',
    database: 'blogs_api',
    host: 'localhost',
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_USER,
    password: 'password',
    database: 'blogs_api',
    host: 'localhost',
    dialect: 'mysql',
  },
};
