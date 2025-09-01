import express from "express";
import {
  adminLogin,
  approveCommentById,
  deleteCommentById,
  deleteBlogById,   // ✅ add this
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
} from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

// ✅ Auth
adminRouter.post("/login", adminLogin);

// ✅ Dashboard
adminRouter.get("/dashboard", auth, getDashboard);

// ✅ Blogs
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.delete("/blogs/:id", auth, deleteBlogById);  // ✅ add blog delete

// ✅ Comments
adminRouter.get("/comments", auth, getAllComments);
adminRouter.delete("/comments/:id", auth, deleteCommentById);
adminRouter.patch("/comments/:id/approve", auth, approveCommentById);

export default adminRouter;
