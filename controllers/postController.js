import Post from "../models/Post.js";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

// Get all posts
export const getPosts = async (req, res) => {
  const posts = await Post.findAll({ include: User });
  res.json(posts);
};


// Create a new post
export const createPost = asyncHandler(async (req, res) => {
  const { body: { userId, title, content, cover } } = req;

  const newPost = await Post.create(req.body);

  res.status(201).json(newPost);
});

// Get a post by ID
export const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findByPk(id, {
    include: { model: User, as: "author", attributes: ["id", "username", "email"] },
  });

  if (!post) {
    throw new ErrorResponse("Post not found", 404);
  }

  res.status(200).json(post);
});

// Update a post by ID
export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, cover } = req.body;

  const post = await Post.findByPk(id);
  if (!post) {
    throw new ErrorResponse("Post not found", 404);
  }

  post.title = title || post.title;
  post.content = content || post.content;
  post.cover = cover || post.cover;

  await post.save();
  res.status(200).json(post);
});

// Delete a post by ID
export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findByPk(id);
  if (!post) {
    throw new ErrorResponse("Post not found", 404);
  }

  await post.destroy();
  res.status(204).send();
});
