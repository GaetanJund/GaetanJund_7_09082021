// Import model User + Post
const User = require('./User');
const Post = require('./Post');

// loadModel pour 
let loadModel = async () => {
    await Post.belongsTo(User, { foreignKey: 'user_id', onDelete: 'cascade' });

    await User.sync({ alter: true });
    await Post.sync({ alter: true });
}

module.exports = { loadModel, User, Post };