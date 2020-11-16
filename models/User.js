const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    { timestamps: false },
  );

  User.associate = (models) =>
    User.hasMany(models.Post, { as: 'posts', foreignKey: 'userId' });

  return User;
};

module.exports = createUser;
