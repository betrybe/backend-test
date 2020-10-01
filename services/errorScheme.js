// function CommonValidationError({ message, status }) {
//   this.name = 'CommonValidationError';
//   this.message = message || 'Mensagem de erro padrão';
//   this.status = status || 400;
// }

// function UserAlreadyRegistered() {
//   this.name = 'UserAlreadyRegistered';
//   this.message = 'Usuário já existe';
//   this.status = 400;
// }

// function UserNotFound() {
//   this.name = 'UserNotFound';
//   this.message = 'Usuário não encontrado';
//   this.status = 404;
// }

// function TokenNotFound() {
//   this.name = 'TokenNotFound';
//   this.message = 'Token não encontrado';
//   this.status = 401;
// }

class CustomError extends Error {
  constructor(message, status, ...params) {
    super(...params);
    this.message = message || 'Mensagem de erro padrão';
    this.status = status || 500;
  }
}

module.exports = CustomError;
