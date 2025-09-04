import fs from "fs";
import imagekit from "../configs/imageKit.js"; 
import Blog from "../models/blog.js";
import Comment from "../models/Comment.js";

// Add a new blog
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }


    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // Generate optimized URL
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    // Save blog to database
    const blog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl,
      isPublished,
    });

    // Delete local temp file
    fs.unlinkSync(imageFile.path);

    res.status(201).json({
      success: true,
      message: "Blog added successfully",
      blog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all published blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { blogID } = req.params;
    const blog = await Blog.findById(blogID);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete blog by ID
export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body; 
    await Blog.findByIdAndDelete(id);

    await comment.deleteMany({blog:id})
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




export const togglePublishStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({
      success: true,
      message: `Blog has been ${blog.isPublished ? "published" : "unpublished"}`,
      blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const addComment = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const blogID = req.params.id;

    if (!blogID || !name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    await Comment.create({
      blog: blogID,
      name,
      email,
      message,
      isApproved:true
    });

    res.json({ success: true, message: "Comment added for review" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};





export const getBlogComments = async (req, res) => {
  try {
    const blogID = req.params.id;

    if (!blogID) {
      return res.status(400).json({ success: false, message: "Blog ID is required" });
    }

    const comments = await Comment.find({ blog: blogID, isApproved: true })
      .sort({ createdAt: -1 });

    res.json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


