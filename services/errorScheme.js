function CommonError({ message, status }) {
  this.name = 'GeneralError';
  this.message = message || 'Mensagem de erro padrão';
  this.status = status || 500;
}

function UserAlreadyRegistered() {
  this.name = 'UserAlreadyRegistered';
  this.message = 'Usuário já existe';
  this.status = 400;
}

module.exports = {
  CommonError,
  UserAlreadyRegistered,
};
