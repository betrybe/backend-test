const User = (sequelize, DataTypes) => sequelize.define('Users', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  displayName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  image: DataTypes.STRING,
},
{
  timestamps: false,
});

module.exports = User;
