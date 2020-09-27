module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createBlogPosts = queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false, autoIncrement: false, primaryKey: true, type: Sequelize.STRING,
      },
      published: {
        allowNull: false, type: Sequelize.STRING,
      },
      updated: {
        allowNull: false, type: Sequelize.STRING,
      },
      title: {
        allowNull: false, type: Sequelize.STRING,
      },
      content: {
        allowNull: false, type: Sequelize.TEXT,
      },
      user_id: {
        allowNull: false, type: Sequelize.STRING,
      },
    });

    return createBlogPosts;
  },

  down: async (queryInterface) => queryInterface.dropTable('BlogPosts'),
};
