module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createBlogPosts = queryInterface.createTable('Posts', {
      id: {
        allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.BIGINT,
      },
      published: {
        allowNull: false, type: Sequelize.DATE,
      },
      updated: {
        allowNull: false, type: Sequelize.DATE,
      },
      title: {
        allowNull: false, type: Sequelize.STRING,
      },
      content: {
        allowNull: false, type: Sequelize.TEXT,
      },
      userId: {
        allowNull: false, type: Sequelize.STRING,
      },
    });

    return createBlogPosts;
  },

  down: async (queryInterface) => queryInterface.dropTable('Posts'),
};
