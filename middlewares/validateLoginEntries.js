const validateLoginEntries = (req, res, next) => {
  const { email, password } = req.body;

  if (email === '' || password === '') {
    return res
      .status(400)
      .json({
        message: `"${
          email === '' ? 'email' : 'password'
        }" is not allowed to be empty`,
      });
  }

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: `"${!email ? 'email' : 'password'}" is required` });
  }

  next();
};

module.exports = { validateLoginEntries };
