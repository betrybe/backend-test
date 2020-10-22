class CustomError extends Error {
  constructor(err, ...params) {
    super(...params);
    this.message = err.message || 'Mensagem de erro padrão';
    this.code = err.code || 500;
  }
}

module.exports = CustomError;
