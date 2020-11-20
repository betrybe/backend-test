const jwt = require('jsonwebtoken');

function encode(data) {
  return jwt.sign(JSON.stringify(data), 'shh');
}
function decode(token) {
  return jwt.verify(token, 'shh');
}
async function validate(token) {
  try {
    await jwt.verify(token, 'shh');
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = { encode, validate, decode };
