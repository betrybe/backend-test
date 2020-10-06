const UserModel = (sequelize, DataTypes) => sequelize.define('Users', {
  id: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false, autoIncrement: true },
  displayName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: true },
});

module.exports = UserModel;
