import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

const CommentTableItem = ({ comment, fetchComments }) => {
  if (!comment) return null; 

  const { blog, createdAt, _id, name, message, isApproved, email } = comment; 
  const blogDate = createdAt ? new Date(createdAt) : new Date();

  const { axios } = useAppContext();
  const token = localStorage.getItem("adminToken");


  const handleApprove = async () => {
    try {
      const { data } = await axios.put(
        `/api/admin/comments/${_id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("Comment approved");
        fetchComments();
      } else {
        toast.error(data.message || "Failed to approve comment");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

 
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      const { data } = await axios.delete(`/api/admin/comments/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        toast.success("Comment deleted");
        fetchComments();
      } else {
        toast.error(data.message || "Failed to delete comment");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      {/* Blog, Name, Comment */}
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog</b>:{" "}
        {blog?.title || "Untitled"}
        <br /><br />
        <b className="font-medium text-gray-600">Name</b>: {name}
        <br />
        <b className="font-medium text-gray-600">Email</b>: {email}
        <br />
        <b className="font-medium text-gray-600">Comment</b>: {message}
      </td>

      {/* Date */}
      <td className="px-6 py-4 max-sm:hidden">
        {blogDate.toLocaleDateString()}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!isApproved ? (
            <img
              src={assets.tick_icon}
              alt="approve"
              className="w-5 hover:scale-110 transition-all cursor-pointer"
              onClick={handleApprove}
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          <img
            src={assets.bin_icon}
            alt="delete"
            className="w-5 hover:scale-110 transition-all cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
