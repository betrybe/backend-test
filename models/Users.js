const Users = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
      displayName: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false, validate: { len: [6, 6] } },
      image: { type: DataTypes.STRING, allowNull: true },
    },
    {
      timestamps: false,
    },
  );

  return User;
};

module.exports = Users;
