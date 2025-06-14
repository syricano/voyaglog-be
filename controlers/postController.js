import Post from "../models/Post";


// Get all posts
export const getPost = async (req, res) => {
    try {
        const posts = await Post.findAll({order: [['createdAt', 'DESC']]});
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Create a new post
export const createPost = async (req, res) => {
    const { author, title, content, cover } = req.body;

    try {
        const newPost = await Post.create({
            author,
            title,
            content,
            cover
        });
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}; 

// Get a post by ID
export const getPostById = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update a post by ID
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { author, title, content, cover } = req.body;

    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        post.author = author || post.author;
        post.title = title || post.title;
        post.content = content || post.content;
        post.cover = cover || post.cover;

        await post.save();
        res.status(200).json(post);
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete a post by ID
export const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        await post.destroy();
        res.status(204).send(); // No content
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

