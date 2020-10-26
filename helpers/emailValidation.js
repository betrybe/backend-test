const emailValidation = (email) => {
  const emailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (email !== undefined && email.match(emailformat)) {
    return true;
  }
  return false;
};

module.exports = emailValidation;
