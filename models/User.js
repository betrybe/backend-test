const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {

    id: DataTypes.STRING,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  return User;
};

module.exports = User;
