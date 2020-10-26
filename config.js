module.exports = {
  port: process.env.PORT || 3000,
  jwtConfig: {
    expiresIn: process.env.EXPIRES_IN || '2d',
    algorithm: process.env.ALGORITHM || 'HS256',
  },
  secret: process.env.SECRET || 'minhaSenhaSuperSecreta',
};
