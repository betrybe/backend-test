const validateUser = ({ displayName, email, password }) => {
  switch (true) {
    case displayName.length < 8:
      return ({ message: "\"displayName\" length must be at least 8 characters long" })
    case !email:
      return ({ message: "\"email\" is required" })
    case !(/([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm).test(email):
      return ({ message: "\"email\" must be a valid email" })
    case password.length < 6:
      return ({ message: "\"password\" length must be at least 6 characters long" })
    default:
      return false;
  };
}

module.exports = validateUser;
