const validateRegister = (name, email, password) => {
  switch (true) {
    case !email:
      return { ok: false, status: 400, message: '"email" is required' };
    case !password:
      return { ok: false, status: 400, message: '"password" is required' };
    case name.length < 8:
      return {
        ok: false,
        status: 400,
        message: '"displayName" length must be at least 8 characters long',
      };
    default:
      return { ok: true, status: 201, message: 'Usuário válido' };
  }
};

module.exports = { validateRegister };
