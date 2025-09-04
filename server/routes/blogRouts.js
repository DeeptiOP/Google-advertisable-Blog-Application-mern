
import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  getBlogComments,
  togglePublishStatus,
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();


blogRouter.post("/add", upload.single("image"), auth, addBlog);


blogRouter.get("/all", getAllBlogs);


blogRouter.get("/:blogID", getBlogById);


blogRouter.delete("/:id", auth, deleteBlogById);


blogRouter.patch("/:id/toggle", auth, togglePublishStatus);


blogRouter.post("/:id/comments", addComment);
blogRouter.get("/:id/comments", getBlogComments);

export default blogRouter;
