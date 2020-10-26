require('dotenv/config');

const { HOSTNAME, MYSQL_USER, MYSQL_PASSWORD } = process.env;

module.exports = {
  development: {
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: 'blogs_api',
    host: HOSTNAME,
    dialect: 'mysql',
  },
  test: {
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: 'blogs_api',
    host: HOSTNAME,
    dialect: 'mysql',
  },
  production: {
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: 'blogs_api',
    host: HOSTNAME,
    dialect: 'mysql',
  },
};
