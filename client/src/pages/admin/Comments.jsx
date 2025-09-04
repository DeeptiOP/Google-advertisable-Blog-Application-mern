import React, { useEffect, useState } from "react";
import CommentTableItem from "../../components/admin/CommentTableItem";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const { axios } = useAppContext();
  const navigate = useNavigate();

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        toast.error("Session expired, please login again");
        navigate("/login");
        return;
      }

      setLoading(true);

      const { data } = await axios.get("/api/admin/comments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setComments(Array.isArray(data.comments) ? data.comments : []);
      } else {
        toast.error(data.message || "Failed to fetch comments");
        setComments([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const allComments = comments || [];

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      {/* Header */}
      <div className="flex justify-between items-center max-w-3xl">
        <h1 className="text-xl font-semibold">Comments</h1>
      </div>

      {/* Table */}
      <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
        {loading ? (
          <p className="text-center py-6 text-gray-400">Loading comments...</p>
        ) : (
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-700 text-left uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-5 py-3">Blog Title & Comment</th>
                <th scope="col" className="px-5 py-3 max-sm:hidden">Date</th>
                <th scope="col" className="px-5 py-3 max-sm:hidden">Action</th>
              </tr>
            </thead>
            <tbody>
              {allComments.length > 0 ? (
                allComments.map((comment, index) => (
                  <CommentTableItem
                    key={comment._id || index}
                    comment={comment}
                    fetchComments={fetchComments}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-400">
                    No comments found
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

export default Comments;
