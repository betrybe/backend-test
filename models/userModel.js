const Users = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTERGER,
    image: DataTypes.STRING,
  },
  { timestamps: false });
  return User;
};

module.exports = {
  Users,
};
