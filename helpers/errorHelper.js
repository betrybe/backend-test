const createError = (status, message) => ({ error: { status, message } });

module.exports = { createError };
