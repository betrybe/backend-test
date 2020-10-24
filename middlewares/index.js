const { getValidateJWT, generateJWT } = require('./auth');
const { validateUserEntries } = require('./validateUserEntries');
const { validateLoginEntries } = require('./validateLoginEntries');
const { validatePostEntries } = require('./validatePostEntries');

module.exports = {
  getValidateJWT,
  generateJWT,
  validateUserEntries,
  validateLoginEntries,
  validatePostEntries,
};
