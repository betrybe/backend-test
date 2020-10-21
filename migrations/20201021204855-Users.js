module.exports = {
  up: (queryInterface, DataTypes) => {
    const UsersTable = queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      displayName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(30),
        unique: true,
      },
      password: {
        allowNull: true,
        type: DataTypes.INTEGER,

      },
      image: {
        type: DataTypes.STRING(255),
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    });
    return UsersTable;
  },

  down: (queryInterface) => {
    queryInterface.dropTable('Users');
  },
};
