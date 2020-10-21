module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      displayName: DataTypes.STRING,
      password: DataTypes.STRING,
      email: { unique: true, type: DataTypes.STRING },
      image: { type: DataTypes.STRING, defaultValue: null },
    },
    { timestamps: false },
  );

  User.associate = (models) => {
    User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
  };

  return User;
};
