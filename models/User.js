const User = (sequelize, DataTypes) => {
  const UserObject = sequelize.define(
    'User',
    {
      displayName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
      },
      password: { type: DataTypes.STRING, validate: { len: [6, 6] } },
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );

  return UserObject;
};

module.exports = User;
