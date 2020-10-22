const validateLogin = (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email === '') {
      return res
        .status(400)
        .json({ message: '"email" is not allowed to be empty' });
    }
    if (!email) return res.status(400).json({ message: '"email" is required' });
    if (password === '') {
      return res
        .status(400)
        .json({ message: '"password" is not allowed to be empty' });
    }
    if (!password) {
      return res.status(400).json({ message: '"password" is required' });
    }
    next();
  } catch (error) {
    return error;
  }
};

module.exports = validateLogin;
