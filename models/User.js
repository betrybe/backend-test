const Users = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });
  Users.associate = (models) => {
    Users.hasMany(models.BlogPosts,
      { foreignKey: 'id', as: 'posts' });
  };
  return User;
};

module.exports = Users;
