const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BlogPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
    }
  }
  BlogPost.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: {
        type: DataTypes.STRING,
        references: {
          model: sequelize.models.User,
          key: 'id',
        },
      },

      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Post',
      tableName: 'Posts',
    },
  );
  return BlogPost;
};
