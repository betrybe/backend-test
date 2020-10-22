module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'Users',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    { timestamps: false },
  );

  User.associate = (models) => {
    User.hasMany(models.Posts, { foreignKey: 'userId', as: 'posts' });
  };

  return User;
};
