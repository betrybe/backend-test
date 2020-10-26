const errors = {
  invalid_name: { message: '"displayName" length must be at least 8 characters long', status: 400 },
  invalid_password: { message: '"password" length must be 6 characters long', status: 400 },
  invalid_email: { message: '"email" must be a valid email', status: 400 },
  email_required: { message: '"email" is required', status: 400 },
  password_required: { message: '"password" is required', status: 400 },
  title_required: { message: '"title" is required', status: 400 },
  content_required: { message: '"content" is required', status: 400 },
  empty_email: { message: '"email" is not allowed to be empty', status: 400 },
  empty_password: { message: '"password" is not allowed to be empty', status: 400 },
  invalid_fields: { message: 'Campos inválidos', status: 400 },
  unauthorized_user: { message: 'Usuário não autorizado', status: 401 },
  token_error: { message: 'Token expirado ou inválido', status: 401 },
  no_token: { message: 'Token não encontrado', status: 401 },
  invalid_id: { message: 'Invalid id', status: 401 },
  user_not_found: { message: 'Usuário não existe', status: 404 },
  post_not_found: { message: 'Post não existe', status: 404 },
  user_exists: { message: 'Usuário já existe', status: 409 },
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
    return { message: err.message };
  }
}

module.exports = (err, _req, res, _next) => {
  console.log('error: ', err);
  const error = makeError(err);
  // ternário top do Herbert https://github.com/tryber/sd-03-store-manager/pull/4/files
  return error
    ? res.status(error.status).json(error.payload)
    : res.status(500).json({ message: 'Internal error' });
};
