import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, blog_data, comments_data } from "../assets/assets";
import Moment from "moment";
import Footer from "../components/Footer";
import { Facebook, Instagram, Loader } from "lucide-react";
import LoadingSpiner from "./LoadingSpiner";
import { useAppContext } from "../context/appContext";
import toast from "react-hot-toast";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
const Blog = () => {
  const { id } = useParams();

  const {axios}=useAppContext()
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const[message,setMessage]=useState('');
    const[email,setEmail]=useState('');
const fetchComments = async () => {
  try {
    const { data } = await axios.get(`/api/blog/${id}/comments`);
    console.log("Comments API Response:", data); // 👈 add this here
    if (data.success) {
      setComments(data.comments);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Fetch comments error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Failed to load comments");
  }
};

const addcomment = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(`/api/blog/${id}/comments`, {
      name,
      email,
      message,
    });

    if (data.success) {
      toast.success(data.message);
      setName("");
      setEmail("");
      setMessage("");
      fetchComments(); 
    } else {
      toast.error(data.message || "Something went wrong!");
    }
  } catch (error) {
    console.error("Add comment error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Failed to add comment");
  }
};





   const fetchBlogData = async() => {
  try {
    const {data}=await axios.get(`/api/blog/${id}`)
    data.success? setData(data.blog):toast.error(data.message)

  } catch (error) {
    toast.error(error.message)
    
  }
    };
  useEffect(() => {
   

    fetchBlogData();
    fetchComments();
  }, [id]);

  return (
    <div>
      {data ? (
        <div className="relative">
          <img
            src={assets.gradientBackground}
            alt=""
            className="absolute -top-50 -z-1 opacity-50"
          />
          <div className="text-center mt-20 text-gray-600">
            <p className=" text-primary py-4 font-medium">
              {" "}
              Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
            </p>
            <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
              {data.title}
            </h1>
            <h2 className="my-5 max-w-lg trunate mx-auto ">{data.subTitle}</h2>
            <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary ">
              tushar
            </p>
          </div>

          <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
            <img src={data.image} alt="" className="rounded-3xl mb-5" />

            <div
              className="rich-text max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{ __html: data.description }}
            ></div>
            {/* comment section */}
            <div className="mt-14 mb-10 max-w-3xl mx-auto">
              <p className="font-semibold mb-4">
                Comments( {comments.length})
              </p>

              <div className="flex flex-col gap-4">
               {comments.map((item, index) => (
  <div
    key={index}
    className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
  >
    <div className="flex items-center gap-2 mb-2">
      <img src={assets.user_icon} alt="" className="w-6" />
      <p className="font-medium">{item.name}</p>
    </div>
    <p className="text-sm max-w-md ml-8">{item.message}</p>
    <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
      {Moment(item.createdAt).fromNow()}
    </div>
  </div>
))}

              </div>
            </div>

            {/* comment section */}

            <div className="max-w-3xl mx-auto">
              <p className="font-semibold mb-4">Add your comment</p>

            <form onSubmit={addcomment} className="flex flex-col items-start gap-4 max-w-lg">
  <input
    type="text"
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full p-2 border rounded"
    required
  />

  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full p-2 border rounded"
    required
  />

  <textarea
    placeholder="Message"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    className="w-full p-2 border rounded h-48"
    required
  />

  <button type="submit" className="bg-primary text-white p-2 px-8 rounded">
    Submit
  </button>
</form>

            </div>
            {/* 
share button */}
            <div className="my-24 max-w-3xl-auto">
              <p className="font-semibold my-4">
                Share this article in social media
              </p>
              <div className="flex">
              <div className="flex gap-6">
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <Facebook size={22} />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <Twitter size={22} />
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <Instagram size={22} />
          </a>
          <a
            href="mailto:contact@blognest.com"
            className="hover:text-primary transition-colors"
          >
            <Mail size={22} />
          </a>
        </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <LoadingSpiner />
      )}
    </div>
  );
};

export default Blog;
