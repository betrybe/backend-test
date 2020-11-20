module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostTable = queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Users', key: 'id' },
      },
      published: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      updated: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });

    return PostTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('Users'),

};
