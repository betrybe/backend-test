function GeneralError(message, status) {
  this.name = 'GeneralError';
  this.message = message || 'Mensagem de erro padrão';
  this.status = status || 500;
}

module.exports = {
  GeneralError,
}
