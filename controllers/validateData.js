const validateData = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const errMessages = [
    '"displayName" length must be at least 8 characters long',
    '"email" must be a valid email',
    '"email" is required',
    '"password" is required',
    '"password" length must be 6 characters long',
  ];
  if (!email) return res.status(400).json({ message: errMessages[2] });
  if (!password) return res.status(400).json({ message: errMessages[3] });
  if (email.split('')[0] === '@') {
    return res.status(400).json({ message: errMessages[1] });
  }
  if (displayName.length < 8) return res.status(400).json({ message: errMessages[0] });
  if (password.length !== 6) {
    return res.status(400).json({ message: errMessages[4] });
  }
  next();
};

module.exports = validateData;
