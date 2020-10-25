module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostsTable = queryInterface.createTable('Posts', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Users', key: 'id' },
      },
      published: {
        type: Sequelize.DATE,
      },
      updated: {
        type: Sequelize.DATE,
      },
    });
    return PostsTable;
  },

  down: async (queryInterface) => {
    queryInterface.dropTable('Posts');
  },
};
