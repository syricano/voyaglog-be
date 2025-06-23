import { Router } from "express";
import { createPost, getPosts, getPostById, updatePost, deletePost , getMyPosts} from "../controllers/postController.js";
import validateRequest from '../middlewares/validateRequest.js';
import upload from "../middlewares/upload.js";
import protect from "../middlewares/protect.js";

// Initialize the router
const postRouter = Router();

// Public routes
// Get all posts
postRouter.get("/", getPosts);

// Get my posts (protected route)
postRouter.get('/my-posts', protect, getMyPosts);

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
