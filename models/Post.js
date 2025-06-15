import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Post = sequelize.define("Post", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        }
    },
 
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cover : {
    type: DataTypes.STRING,
    allowNull: true, // Cover image is optional
  },
  date : {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Default to current date and time
  },
 
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

export default Post;
