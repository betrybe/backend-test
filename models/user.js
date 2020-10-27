const Users = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  User.associate = (models) => {
    User.hasMany(models.Posts, { foreignKey: 'userId', as: 'Posts' });
  };
  return User;
};

module.exports = Users;
