import React from "react";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-10">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-16">
          {/* Logo + Description */}
          <div className="grid grid-cols-2 gap-10 sm:gap-16 md:flex-1">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 md:mb-5">
                Company
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="/about" className="hover:text-primary transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-primary transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/careers" className="hover:text-primary transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 md:mb-5">
                Resources
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="/blog" className="hover:text-primary transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy-policy"
                    className="hover:text-primary transition"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="hover:text-primary transition"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
              <div className="flex  gap-4 mt-6">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-200 rounded-full hover:bg-primary hover:text-white transition"
              >
                <Github size={18} />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-200 rounded-full hover:bg-primary hover:text-white transition"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-200 rounded-full hover:bg-primary hover:text-white transition"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:contact@blognest.com"
                className="p-2 bg-gray-200 rounded-full hover:bg-primary hover:text-white transition"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
         
         
         
         
          <div className="flex-1">
           

           
           
          </div>

          {/* Quick Links */}
           <div className="flex-1">

           <img
              src={assets.logo}
              alt="BlogNest Logo"
              className="w-20 md:w-28 object-contain"
              />
            <p className="max-w-[400px] mt-4 text-gray-600 text-sm md:text-base">
              <strong>BlogNest</strong> – Your space to share ideas, stories, and
              creativity. Whether it’s one word or a thousand, every story finds
              a nest to grow here.
            </p>
              </div>
         
        </div>

        {/* Divider + Bottom Text */}
        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} <strong>BlogNest</strong>. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
