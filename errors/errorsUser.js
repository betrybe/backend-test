const verifyDisplayName = (name) => {
  if (name.length < 8) {
    const error = {
      status: 400,
      message: '"displayName" length must be at least 8 characters long',
    };
    return error;
  }
  return false;
};

const verifyPassword = (_res, res) => {
  if (password <= 6) res.status(400).json({ message: 'password" length must be 6 characters long' });
};

const verifyEmail = (_req, res) => {
  const regexEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  if (email !== regexEmail) res.ststus(400).json({ message: 'email" is required' });
};

module.exports = {
  verifyDisplayName,
  verifyPassword,
  verifyEmail,
};
