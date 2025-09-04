import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
    isApproved: { type: Boolean, default: true }, 
  },
  { timestamps: true }
);

// Prevent OverwriteModelError
const Comment =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

export default Comment;
