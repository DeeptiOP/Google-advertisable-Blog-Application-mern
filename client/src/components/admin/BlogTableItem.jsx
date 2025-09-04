import React, { useState } from "react";
import { format } from "date-fns";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";

const BlogTableItem = ({ blog, index, fetchBlogs }) => {
  const { axios } = useAppContext();
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`/api/admin/blogs/${blog._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("✅ Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      console.error("❌ Delete blog error:", error.response || error);
      toast.error(error.response?.data?.message || "Failed to delete blog");
    }
  };

  const handleView = () => {
    navigate(`/blog/${blog._id}`);
  };

  // ✅ Toggle publish status
  const handleTogglePublish = async () => {
    setLoading(true);
    try {
      const { data } = await axios.patch(
        `/api/admin/blogs/${blog._id}/publish`,
        { isPublished: !blog.isPublished },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(
          blog.isPublished ? "Blog moved to Draft" : "Blog Published 🎉"
        );
        fetchBlogs();
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Toggle publish error:", error);
      toast.error("Failed to update publish status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="border-b last:border-none hover:bg-gray-50 dark:hover:bg-gray-800 transition">
      <td className="px-3 py-3 text-sm text-gray-500">{index}</td>

      <td className="px-3 py-3 font-semibold text-gray-800 dark:text-gray-200">
        {blog.title}
      </td>

      <td className="px-3 py-3 hidden sm:table-cell text-gray-500 text-sm">
        {blog.createdAt ? format(new Date(blog.createdAt), "MMM dd, yyyy") : "-"}
      </td>

      {/* ✅ Switch Toggle with Label */}
      <td className="px-3 py-3 hidden sm:table-cell">
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={blog.isPublished}
              onChange={handleTogglePublish}
              disabled={loading}
            />
            <div
              className={`w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-700
              peer-checked:after:translate-x-full peer-checked:after:border-white 
              after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
              after:bg-white after:border-gray-300 after:border after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500`}
            ></div>
          </label>

          {/* Status text */}
          <span
            className={`text-sm font-medium ${
              blog.isPublished ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {blog.isPublished ? "Published" : "Draft"}
          </span>
        </div>
      </td>

      {/* Actions */}
      <td className="px-3 py-3 flex items-center gap-3">
        <button
          onClick={handleView}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <Eye size={16} /> <span className="hidden sm:inline">View</span>
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium"
        >
          <Trash2 size={16} /> <span className="hidden sm:inline">Delete</span>
        </button>
      </td>
    </tr>
  );
};

export default BlogTableItem;
