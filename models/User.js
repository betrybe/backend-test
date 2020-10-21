const User = (sequelize, DataTypes) => {
  const UserObject = sequelize.define(
    'User',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );

  return UserObject;
};

module.exports = User;
