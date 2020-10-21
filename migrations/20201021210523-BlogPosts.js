module.exports = {
  up: (queryInterface, DataTypes) => {
    const BlogPostsTable = queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        reference: { model: 'user', key: 'id' },
      },
      published: {
        type: DataTypes.DATE,
      },
      updated: {
        type: DataTypes.DATE,
      },
    });
    return BlogPostsTable;
  },

  down: (queryInterface) => {
    queryInterface.dropTable('BlogPosts');
  },
};
