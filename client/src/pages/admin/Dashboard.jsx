import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });
  const [loading, setLoading] = useState(true);

  const { axios } = useAppContext();
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        toast.error("Session expired, please login again");
        navigate("/login");
        return;
      }

      setLoading(true);

      const { data } = await axios.get("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        
        setDashboardData(data.data);
      } else {
        toast.error(data.message || "Failed to fetch dashboard data");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      {loading ? (
        <p className="text-center text-gray-400">Loading dashboard...</p>
      ) : (
        <>
          {/* Top Stats */}
          <div className="flex flex-wrap gap-4">
            {/* Blogs */}
            <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
              <img src={assets.dashboard_icon_1} alt="Blogs" />
              <div>
                <p className="text-xl font-semibold text-gray-600">
                  {dashboardData.blogs}
                </p>
                <p className="text-gray-400 font-light">Blogs</p>
              </div>
            </div>

            {/* Comments */}
            <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
              <img src={assets.dashboard_icon_2} alt="Comments" />
              <div>
                <p className="text-xl font-semibold text-gray-600">
                  {dashboardData.comments}
                </p>
                <p className="text-gray-400 font-light">Comments</p>
              </div>
            </div>

            {/* Drafts */}
           <div
  onClick={() => navigate("/admin/drafts")}
  className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all"
>
  <img src={assets.dashboard_icon_3} alt="Drafts" />
  <div>
    <p className="text-xl font-semibold text-gray-600">
      {dashboardData.drafts}
    </p>
    <p className="text-gray-400 font-light">Drafts</p>
  </div>
</div>
          </div>

          {/* Latest Blogs */}
          <div>
            <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
              <img src={assets.dashboard_icon_4} alt="Latest Blogs" />
              <p>Latest blogs</p>
            </div>

            <div className="relative max-w-4xl overflow-auto shadow rounded-lg scrollbar-hide bg-white">
              <table className="w-full text-sm text-gray-500">
                <thead className="text-xs text-gray-600 text-left uppercase">
                  <tr>
                    <th scope="col" className="px-2 py-4 xl:px-6 text-semibold">#</th>
                    <th scope="col" className="px-2 py-4 text-semibold">Blog title</th>
                    <th scope="col" className="px-2 py-4 max-sm:hidden text-semibold">Date</th>
                    <th scope="col" className="px-2 py-4 max-sm:hidden text-semibold">Status</th>
                    <th scope="col" className="px-2 py-4 text-semibold">Actions</th>
                  </tr>
                </thead> 
                <tbody>
                  {dashboardData.recentBlogs?.length > 0 ? (
                    dashboardData.recentBlogs.map((blog, index) => (
                      <BlogTableItem
                        key={blog._id}
                        blog={blog}
                        fetchBlogs={fetchDashboardData}
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
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
