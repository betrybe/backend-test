class CustomError extends Error {
  constructor(message, status, ...params) {
    super(...params);
    this.message = message || 'Mensagem de erro padrão';
    this.status = status || 500;
  }
}

module.exports = CustomError;
