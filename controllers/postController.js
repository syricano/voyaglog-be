import Post from "../models/Post.js";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

// Get all posts
export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.findAll({ 
    include: { model: User, as: 'author', attributes: ['id', 'firstName', 'lastName', 'email'] }
  });
  res.json(posts);
});


// Create a new post
export const createPost = asyncHandler(async (req, res) => {
  const { body: { title, content } } = req;
  const image = req.file ? req.file.filename : null;

  

  const newPost = await Post.create({
    authorId: req.user.id,
    title,
    content,
    image
  });

  const imageUrl = image ? `${req.protocol}://${req.get('host')}/uploads/${image}` : null;
  res.status(201).json({ ...newPost.toJSON(), imageUrl });
});

// Get a post by ID
export const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findByPk(id, {
    include: { model: User, as: "author", attributes: ["id","firstName", "lastName", "username", "email"] },
  });

  if (!post) {
    throw new ErrorResponse("Post not found", 404);
  }

  res.status(200).json(post);
});

// Update a post by ID
export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const image = req.file ? req.file.filename : req.body.image;


  const post = await Post.findByPk(id);

  if (!post) {
    throw new ErrorResponse("Post not found", 404);
  }

  if (post.authorId !== req.user.id) {
    return res.status(403).json({ message: "Not authorized to update this post" });
  }

  post.title = title || post.title;
  post.content = content || post.content;
  post.image = image || post.image;

  await post.save();
  const imageUrl = post.image ? `${req.protocol}://${req.get('host')}/uploads/${post.image}` : null;
  res.status(200).json({ ...post.toJSON(), imageUrl });
});

// Delete a post by ID
export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findByPk(id);
  if (!post) {
    throw new ErrorResponse("Post not found", 404);
  }

  if (post.authorId !== req.user.id) {
    return res.status(403).json({ message: "Not authorized to delete this post" });
  }

  await post.destroy();
  res.status(204).send();
});
