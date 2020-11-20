function createUser(req, res, next) {
  const { displayName, email, password } = req.body;
  if (displayName.length < 8) {
    return res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });
  }
  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (!(/(\w+)@(\w+).com/gm).test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  return next();
}

function login(req, res, next) {
  const { email, password } = req.body;

  if (email === undefined) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (password === undefined) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (email.length < 1) {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }
  if (password.length < 1) {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }

  next();
}

module.exports = { createUser, login };
