const createUser = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { timestamps: false });

  user.associate = (models) => {
    user.hasMany(models.Post, { foreignKey: 'userId', as: 'Posts' });
  };

  return user;
};

module.exports = createUser;
