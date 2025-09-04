import express from "express";
import {
  adminLogin,
  approveCommentById,
  deleteCommentById,
  deleteBlogById,  
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
  togglePublishStatus
} from "../controllers/adminController.js";
import auth from "../middleware/auth.js";
import Blog from "../models/blog.js";  // ✅ ADD THIS

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

adminRouter.get("/dashboard", auth, getDashboard);

adminRouter.patch("/blogs/:id/toggle", auth, togglePublishStatus);

adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.delete("/blogs/:id", auth, deleteBlogById);

adminRouter.get("/comments", auth, getAllComments);
adminRouter.delete("/comments/:id", auth, deleteCommentById);
adminRouter.patch("/comments/:id/approve", auth, approveCommentById);


adminRouter.patch("/blogs/:id/publish", auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { isPublished: req.body.isPublished },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.json({ success: true, blog });
  } catch (err) {
    console.error("Error updating publish status:", err);
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
});
adminRouter.get("/blogs/drafts", auth, async (req, res) => {
  try {
    const drafts = await Blog.find({ isPublished: false }).sort({ createdAt: -1 });
    res.json({ success: true, drafts });
  } catch (err) {
    console.error("Error fetching drafts:", err);
    res.status(500).json({ success: false, message: "Failed to fetch drafts" });
  }
});

export default adminRouter;
