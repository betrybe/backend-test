class CustomError extends Error {
  constructor(message, code, ...params) {
    super(...params);
    this.message = message || 'Mensagem de erro padrão';
    this.code = code || 500;
  }
}

module.exports = CustomError;
