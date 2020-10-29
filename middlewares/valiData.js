const validateUser = ({ displayName, email, password }) => {
  switch (true) {
    case displayName.length < 8:
      return ({ message: '"displayName" length must be at least 8 characters long' });
    case !email:
      return ({ message: '"email" is required' });
    case !(/([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm).test(email):
      return ({ message: '"email" must be a valid email' });
    case !password:
      return ({ message: '"password" is required' });
    case password.length < 6:
      return ({ message: '"password" length must be 6 characters long' });
    default:
      return false;
  }
};

const checkLoginFields = (email, password) => {
  switch (true) {
    case email === '':
      return ({ message: '"email" is not allowed to be empty' });
    case password === '':
      return ({ message: '"password" is not allowed to be empty' });
    case !email:
      return ({ message: '"email" is required' });
    case !password:
      return ({ message: '"password" is required' });
    default:
      return false;
  }
};

const validatePostData = (title, content) => {
  switch (true) {
    case !title || title === '':
      return ({ message: '"title" is required' });
    case !content || content === '':
      return ({ message: '"content" is required' });
    default:
      return false;
  }
};

module.exports = {
  validateUser,
  checkLoginFields,
  validatePostData,
};
