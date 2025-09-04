import React, { useEffect, useState } from "react";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { axios } = useAppContext();
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        toast.error("Session expired, please login again");
        navigate("/login");
        return;
      }

      setLoading(true);

      const { data } = await axios.get("/api/admin/blogs", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        
        setBlogs(data.data || []);
      } else {
        toast.error(data.message || "Failed to fetch blogs");
      }
    } catch (error) {
      console.error("❌ Fetch blogs error:", error.response || error);

      if (error.response?.status === 401) {
        toast.error("Session expired, please login again");
        localStorage.removeItem("adminToken");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to load blogs");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <h1 className="text-xl font-semibold mb-4">All Blogs</h1>

      <div className="relative mt-4 h-4/5 max-w-4xl overflow-auto shadow rounded-lg scrollbar-hide bg-white">
        {loading ? (
          <p className="text-center py-6 text-gray-400">Loading blogs...</p>
        ) : (
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase bg-gray-50">
              <tr>
                <th className="px-2 py-4 xl:px-6">#</th>
                <th className="px-2 py-4">Blog Title</th>
                <th className="px-2 py-4 max-sm:hidden">Date</th>
                <th className="px-2 py-4 max-sm:hidden">Status</th>
                <th className="px-2 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length > 0 ? (
                blogs.map((blog, index) => (
                  <BlogTableItem
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchBlogs}
                    index={index + 1}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    No blogs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ListBlog;
