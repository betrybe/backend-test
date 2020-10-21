const Users = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: DataTypes.INTERGER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTERGER,
    image: DataTypes.INTEGER,
  });
  return User;
};

module.exports = {
  Users,
};
