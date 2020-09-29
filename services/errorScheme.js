function CommonValidationError({ message, status }) {
  this.name = 'GeneralError';
  this.message = message || 'Mensagem de erro padrão';
  this.status = status || 400;
}

function UserAlreadyRegistered() {
  this.name = 'UserAlreadyRegistered';
  this.message = 'Usuário já existe';
  this.status = 400;
}

module.exports = {
  CommonValidationError,
  UserAlreadyRegistered,
};
