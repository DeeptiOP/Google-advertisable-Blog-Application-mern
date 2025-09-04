import jwt from "jsonwebtoken";
import Blog from "../models/blog.js";
import Comment from "../models/Comment.js";

//  Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Get all blogs
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.json({
      success: true,
      message: "Blog deleted successfully",
      data: deletedBlog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog", "title") 
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });

    res.json({
      success: true,
      data: {
        blogs,
        comments,
        drafts,
        recentBlogs,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    res.json({
      success: true,
      message: "Comment deleted successfully",
      data: deletedComment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true }
    ).lean();

    if (!updatedComment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    res.json({
      success: true,
      message: "Comment approved successfully",
      data: updatedComment,
    });
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
      blog 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
