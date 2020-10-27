const CreateUser = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    { timestamps: false },
  );

  /* User.associate = (models) => {
    User.hasMany(models.Post, { foreignKey: 'userId', as: 'user' });
  }; */

  return User;
};

module.exports = CreateUser;