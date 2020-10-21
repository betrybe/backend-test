const errors = {
  invalid_name: { message: '"displayName" length must be at least 8 characters long', status: 400 },
  invalid_password: { message: '"password" length must be 6 characters long', status: 400 },
  invalid_email: { message: '"email" must be a valid email', status: 400 },
  email_required: { message: '"email" is required', status: 400 },
  password_required: { message: '"password" is required', status: 400 },
  user_exists: { message: 'Usuário já existe', status: 409 },
  user_not_exist: { message: 'User not found', status: 404 },
  token_error: { message: 'Invalid token ', status: 401 },
  invalid_id: { message: 'Invalid id', status: 401 },
  internal_error: { message: 'Internal error', status: 500 },
};

function makeError(err) {
  try {
    return {
      status: errors[err].status,
      payload: { message: errors[err].message },
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}

module.exports = (err, _req, res, _next) => {
  console.log('erre', err);
  const error = makeError(err);
  // ternário top do Herbert https://github.com/tryber/sd-03-store-manager/pull/4/files
  return error
    ? res.status(error.status).json(error.payload)
    : res.status(500).json({ message: 'Internal error' });
};
