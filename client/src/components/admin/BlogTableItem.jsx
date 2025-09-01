import React from "react";
import { format } from "date-fns";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BlogTableItem = ({ blog, index, fetchBlogs }) => {
  const { axios } = useAppContext();
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  // ✅ Delete Blog
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`/api/blogs/${blog._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      console.error("❌ Delete blog error:", error.response || error);
      toast.error(error.response?.data?.message || "Failed to delete blog");
    }
  };

  // ✅ Navigate to edit page
  const handleEdit = () => {
    navigate(`/admin/blogs/edit/${blog._id}`);
  };

  // ✅ Navigate to public view
  const handleView = () => {
    navigate(`/blogs/${blog._id}`);
  };

  return (
    <tr className="border-b last:border-none hover:bg-gray-50 transition">
      <td className="px-2 py-3 xl:px-6">{index}</td>
      <td className="px-2 py-3 font-medium text-gray-700">{blog.title}</td>
      <td className="px-2 py-3 max-sm:hidden text-gray-500">
        {blog.createdAt ? format(new Date(blog.createdAt), "MMM dd, yyyy") : "-"}
      </td>
      <td className="px-2 py-3 max-sm:hidden">
        {blog.isPublished ? (
          <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
            Published
          </span>
        ) : (
          <span className="px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">
            Draft
          </span>
        )}
      </td>
      <td className="px-2 py-3 space-x-2">
        <button
          onClick={handleView}
          className="text-blue-600 hover:underline text-sm"
        >
          View
        </button>
        <button
          onClick={handleEdit}
          className="text-indigo-600 hover:underline text-sm"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:underline text-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default BlogTableItem;
