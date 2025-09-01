import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { assets, blogCategories } from "../../assets/assets";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

const AddBlog = () => {
  const { axios } = useAppContext();

  const [isAdding, setIsAdding] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // ✅ Initialize Quill once
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  // ✅ Submit handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      const blog = {
        title,
        subTitle,
        description: quillRef.current ? quillRef.current.root.innerHTML : "",
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message);

        // Reset form
        setImage(null);
        setTitle("");
        setSubTitle("");
        setCategory("Startup");
        setIsPublished(false);
        if (quillRef.current) quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  // ✅ Placeholder for AI content generation
  const generateContent = async () => {
    if (!quillRef.current) return;
    // Example: Insert placeholder AI text
    quillRef.current.root.innerHTML =
      "<p>This is AI-generated blog content...</p>";
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex justify-center items-start bg-blue-50/50 text-gray-600 h-screen w-screen p-4 overflow-auto"
    >
      <div className="bg-white w-full max-w-3xl p-6 md:p-10 shadow-lg rounded-2xl">
        {/* Thumbnail Upload */}
        <p className="font-medium text-gray-700">Upload Thumbnail</p>
        <label htmlFor="image" className="block mt-2 cursor-pointer">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt="Upload Thumbnail"
            className="h-20 w-20 rounded-lg border-2 border-dashed border-gray-300 object-cover hover:opacity-80 transition"
          />
          <input
            type="file"
            id="image"
            hidden
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        {/* Blog Title */}
        <p className="mt-6 font-medium text-gray-700">Blog Title</p>
        <input
          type="text"
          className="w-full max-w-lg mt-2 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary transition"
          placeholder="Type here"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Blog Subtitle */}
        <p className="mt-4 font-medium text-gray-700">Sub Title</p>
        <input
          type="text"
          className="w-full max-w-lg mt-2 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary transition"
          placeholder="Type here"
          required
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        />

        {/* Blog Description */}
        <p className="mt-4 font-medium text-gray-700">Blog Description</p>
        <div className="relative max-w-lg h-64 mt-2 pb-16 border border-gray-300 rounded-lg">
          <div ref={editorRef} className="h-full p-2 overflow-auto" />
          <button
            type="button"
            onClick={generateContent}
            className="absolute bottom-2 right-2 text-xs text-white bg-black/70 px-3 py-1.5 rounded hover:bg-black/80 transition"
          >
            Generate with AI
          </button>
        </div>

        {/* Category Select */}
        <p className="mt-4 font-medium text-gray-700">Blog Category</p>
        <select
          className="mt-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-600 outline-none focus:ring-2 focus:ring-primary transition"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          {blogCategories.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Publish Checkbox */}
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="scale-125 cursor-pointer"
          />
          <span className="text-gray-700">Publish</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isAdding}
          className="mt-8 w-40 h-10 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm"
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
