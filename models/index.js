const Users = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.VARCHAR,
    email: DataTypes.VARCHAR,
    password: DataTypes.INTERGER,
    image: DataTypes.INTEGER,
  });
  return User;
};

module.exports = {
  Users,
};
