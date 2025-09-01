import { useState } from "react";
import { Menu, X } from "lucide-react";
import { assets, blogCategories } from "../assets/assets";
import { motion } from "framer-motion";
import { useAppContext } from "../context/appContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menu, setMenu] = useState("All");

  const { navigate, token } = useAppContext();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // ✅ Define the redirect handlers
  const handleRedirect = () => {
    navigate("/"); // logo → homepage
  };

  const handleRedirect2 = () => {
    navigate("/login"); // user icon → login page
  };

  return (
    <nav className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-3 md:px-12">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleRedirect}
        >
          <img
            src={assets.logo}
            alt="BlogNest Logo"
            className="w-10 h-10 md:w-12 md:h-12 object-contain"
          />
          <span className="text-xl md:text-2xl font-bold text-primary">
            BlogNest
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {blogCategories.map((item) => (
            <motion.button
              key={item}
              onClick={() => setMenu(item)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                backgroundColor: menu === item ? "#573bf6" : "#ffffff",
                color: menu === item ? "#ffffff" : "#4B5563",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="px-4 py-1 rounded-full border border-gray-200"
            >
              {item}
            </motion.button>
          ))}

          {/* Right Icons */}
          <div className="hidden md:flex items-center gap-5">
            {token ? (
              <button
                onClick={() => navigate("/admin")}
                className="font-semibold text-primary hover:underline"
              >
                Dashboard
              </button>
            ) : (
              <img
                onClick={handleRedirect2}
                className="h-8 w-8 cursor-pointer rounded-full transition-transform hover:scale-110"
                src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
                alt="user"
              />
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 px-6 py-4 space-y-3">
          {blogCategories.map((item) => (
            <button
              key={item}
              onClick={() => {
                setMenu(item);
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md ${
                menu === item
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item}
            </button>
          ))}

          {/* Mobile User Icon */}
          <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
            <img
              onClick={() => {
                handleRedirect2();
                setIsMenuOpen(false);
              }}
              className="h-8 w-8 cursor-pointer rounded-full transition-transform hover:scale-110"
              src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
              alt="user"
            />
          </div>
        </div>
      )}
    </nav>
  );
}
