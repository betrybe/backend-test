const validateEmail = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const validateUserData = (displayName, email, password) => {
  switch (true) {
    case (displayName.length < 8):
      return { error: true, status: 400, message: '"displayName" length must be at least 8 characters long' };
    case (!email):
      return { error: true, status: 400, message: '"email" is required' };
    case (!validateEmail(email)):
      return { error: true, status: 400, message: '"email" must be a valid email' };
    case (!password):
      return { error: true, status: 400, message: '"password" is required' };
    case (password.length < 6):
      return { error: true, status: 400, message: '"password" length must be 6 characters long' };
    default:
      return { error: false };
  }
};

const validateLoginData = (email, password) => {
  switch (true) {
    case (email === ''):
      return { error: true, status: 400, message: '"email" is not allowed to be empty' };
    case (!email):
      return { error: true, status: 400, message: '"email" is required' };
    case (password === ''):
      return { error: true, status: 400, message: '"password" is not allowed to be empty' };
    case (!password):
      return { error: true, status: 400, message: '"password" is required' };
    default:
      return { error: false };
  }
};

module.exports = {
  validateUserData,
  validateLoginData,
};
