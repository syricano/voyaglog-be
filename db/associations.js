import sequelize from './index.js';
import Post from '../models/Post.js';
import User from '../models/User.js';

User.hasMany(Post, {
  foreignKey: {
    allowNull: false,
    name: 'authorId'
  },
  as: 'posts',
  onDelete: 'CASCADE',
  hooks: true,
  scope: {
    isActive: true // Assuming you have an isActive field in User model
  }
});
Post.belongsTo(User, { foreignKey: { allowNull: false, name: 'authorId' }, as:'author', onDelete: 'CASCADE' });

sequelize.sync();