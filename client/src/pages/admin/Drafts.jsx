import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";
import BlogTableItem from "../../components/admin/BlogTableItem";

const Drafts = () => {
  const { axios } = useAppContext();
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDrafts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        toast.error("Session expired, please login again");
        return;
      }

      setLoading(true);
      const { data } = await axios.get("/api/admin/blogs/drafts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setDrafts(data.drafts);
      } else {
        toast.error(data.message || "Failed to fetch drafts");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold mb-4">Draft Blogs</h1>
      {loading ? (
        <p className="text-gray-400">Loading drafts...</p>
      ) : drafts.length > 0 ? (
        <div className="relative max-w-4xl overflow-auto shadow rounded-lg bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th className="px-2 py-4">#</th>
                <th className="px-2 py-4">Title</th>
                <th className="px-2 py-4">Date</th>
                <th className="px-2 py-4">Status</th>
                <th className="px-2 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drafts.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  index={index + 1}
                  fetchBlogs={fetchDrafts}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-400">No drafts available</p>
      )}
    </div>
  );
};

export default Drafts;
