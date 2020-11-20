const jwt = require('jsonwebtoken');

function encode(data) {
  return jwt.sign(JSON.stringify(data), 'shh');
}
async function validate(token) {
  try {
    console.log(token);
    const isvalid = await jwt.verify(token, 'shh');
    console.log('isvalida', isvalid);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = { encode, validate };
