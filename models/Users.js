const Users = (sequelize, DataTypes) => {
  const users = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  // Relacionamento 1:N
  users.associate = (models) => {
    users.hasMany(models.Posts,
      { foreignKey: 'userId', as: 'Posts' });
  };

  return users;
};

module.exports = Users;
