const validateEmail = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const validateUserData = (displayName, email, password) => {
  switch (true) {
    case (displayName.length < 8):
      return { error: true, status: 400, message: '”displayName” length must be at least 8 characters long' };
    case (!validateEmail(email)):
      return { error: true, status: 400, message: '”email” must be a valid email' };
    case (!email):
      return { error: true, status: 400, message: '”email” is required' };
    case (password.length < 6):
      return { error: true, status: 400, message: '”password” length must be at least 6 characters long' };
    case (!password):
      return { error: true, status: 400, message: '”password” is required' };
    default:
      return { error: false };
  }
};

module.exports = {
  validateUserData,
};
