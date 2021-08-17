// Import model User + Post
const User = require('./User');
const Post = require('./Post');
const Comments = require('./Comment');

// loadModel pour 
const loadModel = async () => {
    await Post.belongsTo(User, { foreignKey: 'user_id', onDelete: 'cascade' });
    await Comments.belongsTo(User, { foreignKey : 'user_id', onDelete: 'cascade'});
    await Post.hasMany(Comments, { foreignKey: 'post_id', onDelete: 'cascade'});

    await User.sync({ alterForce: true });
    await Post.sync({ alterForce: true });
    await Comments.sync({ alterForce: true });
};

module.exports = { loadModel, User, Post, Comments };