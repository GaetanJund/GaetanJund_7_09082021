// Import model User + Post
const User = require('./User');
const Post = require('./Post');
const Comments = require('./Comment');
const database = require('./connexion');

// loadModel pour 
const loadModel = async () => {
    await Post.belongsTo(User, { foreignKey: 'user_id', onDelete: 'cascade' });
    await Comments.belongsTo(User, { foreignKey : 'user_id', onDelete: 'cascade'});
    await Post.hasMany(Comments, { foreignKey: 'post_id', onDelete: 'cascade'});

    await database.query('SET FOREIGN_KEY_CHECKS=0');
    await User.sync({ alter: true });
    await Post.sync({ alter: true });
    await Comments.sync({ alter: true });
    await database.query('SET FOREIGN_KEY_CHECKS=1');
};

module.exports = { loadModel, User, Post, Comments };