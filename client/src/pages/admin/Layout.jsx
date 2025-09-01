import React from "react";
import { assets } from "../../assets/assets";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";

const Layout = () => {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
  };
  return (

    <>
    <div className="flex justify-between items-center py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200">
      <div className="flex items-center gap-2 cursor-pointer" onClick={()=>navigate('/')}>
        <img
          src={assets.logo}
          alt="BlogNest Logo"
          className="w-10 h-10 md:w-12 md:h-12 object-contain"
        />
        <span className="text-xl md:text-2xl font-bold text-primary">
          BlogNest
        </span>
      </div>
      <button
        onClick={logout}
        className="text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer"
      >
        Logout
      </button>
    </div>
  <div className="flex h-[calc(100vh-70px)]">

 <Sidebar/>

    <Outlet/>



  </div>
  </>
  );
};

export default Layout;
