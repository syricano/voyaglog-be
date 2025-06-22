import { Router } from "express";
import { createPost, getPosts, getPostById, updatePost, deletePost } from "../controllers/postController.js";
import validateRequest from '../middlewares/validateResquest.js';
import upload from "../middlewares/upload.js";
import { protect } from "../middlewares/auth.js";

// Initialize the router
const postRouter = Router();

// Public routes
// Get all posts
postRouter.get("/", getPosts);

// Get a post by ID
postRouter.get("/:id", getPostById);

// Protected routes

// Create a new post
postRouter.post("/", protect, upload.single("image"),validateRequest('posts'), createPost);
// Update a post by ID
postRouter.put("/:id", protect, upload.single("image") , validateRequest('posts'), updatePost);

// Delete a post by ID
postRouter.delete("/:id", protect , deletePost);

export default postRouter;
