const UserModel = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false, autoIncrement: true },
    displayName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Posts,
      { foreignKey: 'userId', as: 'posts' });
  };

  return Users;
};

module.exports = UserModel;
