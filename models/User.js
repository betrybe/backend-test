module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      displayName: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      image: { type: DataTypes.STRING, defaultValue: null },
    },
    { timestamps: false },
  );
  return User;
};
