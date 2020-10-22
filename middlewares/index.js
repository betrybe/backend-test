const { getValidateJWT, generateJWT } = require('./auth');
const { validateEntries } = require('./validateEntries');

module.exports = {
  getValidateJWT,
  generateJWT,
  validateEntries,
};
