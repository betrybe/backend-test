const Users = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });
  User.associate = (models) => {
    User.hasMany(models.BlogPosts,
      { foreignKey: 'id', as: 'posts' });
  };
  return User;
};

module.exports = Users;
