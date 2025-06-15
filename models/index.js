import User from "./User";
import Post from "./Post";

User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "author" });
export { User, Post };
