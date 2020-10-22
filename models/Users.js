const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  User.associate = (models) => {
    User.hasOne(models.Posts,
      { foreignKey: 'userId', as: 'posts' });
  };

  return User;
};

module.exports = createUser;
