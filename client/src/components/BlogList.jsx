import React from "react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/appContext";

const BlogList = () => {
  const { blogs = [], input = "", selectedCategory } = useAppContext();

  const filteredBlogs = blogs.filter((blog) => {
    // search filter
    const matchesInput =
      !input.trim() ||
      blog.title?.toLowerCase().includes(input.toLowerCase()) ||
      blog.category?.toLowerCase().includes(input.toLowerCase());

    // category filter
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;

    return matchesInput && matchesCategory;
  });

  if (!filteredBlogs.length) {
    return (
      <div className="text-center text-gray-500 mt-10">No blogs found 🚀</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
      {filteredBlogs.map((blog) => (
        <BlogCard key={blog._id || blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
