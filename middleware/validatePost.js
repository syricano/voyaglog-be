export const validatePost = (req, res, next) => {
    const { author, title, content, cover } = req.body;

    const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

    // Check if all required fields are present
    if (!author || !title || !content) {
        return res.status(400).json({ error: "Author, title, and content are required." });
    }

    // Check if the title is at least 5 characters long
    if (title.length < 5) {
        return res.status(400).json({ error: "Title must be at least 5 characters long." });
    }

    // Check if the content is at least 20 characters long
    if (content.length < 20) {
        return res.status(400).json({ error: "Content must be at least 20 characters long." });
    }

    // If cover is provided, check if it's a valid URL
    if (cover && !isValidUrl(cover)) {
        return res.status(400).json({ error: "Cover must be a valid URL." });
    }

    next();
}

