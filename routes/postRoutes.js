import { Router } from "express";
import { createPost, getPosts, getPostById, updatePost, deletePost } from "../controllers/postController.js";

const postRouter = Router();

// Create a new post
postRouter.post("/", createPost);

// Get all posts
postRouter.get("/", getPosts);

// Get a post by ID
postRouter.get("/:id", getPostById);

// Update a post by ID
postRouter.put("/:id", updatePost);

// Delete a post by ID
postRouter.delete("/:id", deletePost);

export default postRouter;
