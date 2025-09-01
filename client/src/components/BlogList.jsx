import React, { useState } from "react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/appContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs = [], input = "" } = useAppContext(); // fallback to [] and ""

  const filteredBlogs = () => {
    if (!Array.isArray(blogs)) return [];

    // If no input, return all blogs
    if (!input.trim()) return blogs;

    return blogs.filter(
      (blog) =>
        blog.title?.toLowerCase().includes(input.toLowerCase()) ||
        blog.category?.toLowerCase().includes(input.toLowerCase())
    );
  };

  const finalBlogs = filteredBlogs().filter((blog) =>
    menu === "All" ? true : blog.category === menu
  );

  if (!finalBlogs.length) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No blogs found 🚀
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
      {finalBlogs.map((blog) => (
        <BlogCard key={blog._id || blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
