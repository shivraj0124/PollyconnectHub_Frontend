import React from "react";
import { motion } from "framer-motion";
import bg from "../assets/AI-Campaign-Hero-Section_BG_Glow.gif";
import bg2 from "../assets/gifWhite.gif";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";
import themeHook from "./Context";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaUserCircle } from "react-icons/fa";
import Chatbot from "../Components/Chat/ChatBot"
function MyHome() {
  const { theme, setTheme, userDetails } = themeHook();
  const navigate = useNavigate();
  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleGetStarted = () => {
    const userDetailsFromLocalStorage = JSON.parse(
      localStorage.getItem("userDetails")
    );
    console.log(userDetailsFromLocalStorage);
    if (!userDetailsFromLocalStorage) {
      navigate("/login");
    } else {
      navigate("/visit");
    }
  };

  return (
    <div className="min-h-screen w-full dark:bg-black bg-white text-slate-900 dark:text-slate-100">
      {/* Navigation */}
      <nav className=" w-[100%] px-6 py-4 flex justify-between items-center sticky top-0 dark:bg-slate-900 bg-white shadow-md z-50">
        <div className="text-2xl font-bold text-green-800 flex items-center space-x-2">
          <FaProjectDiagram size={40} />
          <span className="text-green-600">PolyConnectHub</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="hover:text-green-500 transition-colors">
            Home
          </a>
          <a
            href="#features"
            className="hover:text-green-500 transition-colors"
          >
            Features
          </a>
          <a
            href="#categories"
            className="hover:text-green-500 transition-colors"
          >
            Categories
          </a>
          <a href="#contact" className="hover:text-green-500 transition-colors">
            Contact
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <div className="cursor-pointer" onClick={handleTheme}>
            {theme === "light" ? (
              <MdOutlineDarkMode size={24} />
            ) : (
              <MdOutlineLightMode size={24} />
            )}
          </div>
          {userDetails === null ? (
            <div className="flex flex-row items-center gap-2">
              <Button
                variant="contained"
                type="submit"
                style={{
                  backgroundColor: "#22c55e",
                }}
                onClick={() => navigate("/Login")}
              >
                Login
              </Button>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-2 dark:text-white">
              {userDetails?.userType === "admin" ? (
                <h1 className=" font-semibold">
                  <Link to="/Admin/Dashboard">{userDetails?.username}</Link>
                </h1>
              ) : userDetails?.userType === "poc" ? (
                <h1 className=" font-semibold">
                  <Link to="/Poc/Dashboard">{userDetails?.username}</Link>
                </h1>
              ) : userDetails?.userType === "HOD" ? (
                <h1 className=" font-semibold">
                  <Link to="/Hod/Dashboard">{userDetails?.username}</Link>
                </h1>
              ) : (
                <h1 className=" font-semibold">
                  <Link to="/Profile">{userDetails?.username}</Link>
                </h1>
              )}

              {/* <div className="text-white bg-gray-600 rounded-[50%] p-2 w-[40px] h-[40px] flex justify-center items-center">
                    A
                </div> */}
              <FaUserCircle
                className=" text-darkgreen"
                size={40}
              ></FaUserCircle>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      {/* <section
        id="home"
        className="container mx-auto px-6 py-16 text-center h-[80vh]"
        style={{
          backgroundImage: theme === "dark" ? `url(${bg})` : `url(${bg2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity:theme === "dark" ? '':0.7
        }}
      >
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold mt-40"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="block">Connect, Create, and </span>
          <span className="text-green-500">Innovate</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl dark:text-slate-300 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A platform for polytechnic students to showcase their projects and get
          verified by HODs
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full flex items-center mx-auto"
            onClick={handleGetStarted}
          >
            Get Started
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </button>
        </motion.div>
      </section> */}
      <section
        id="home"
        className="relative w-full px-6 py-16 text-center h-[92vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: theme === "dark" ? `url(${bg})` : `url(${bg2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Content */}
        <div className="relative z-20 text-white max-w-5xl mx-auto">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block">Connect, Create, and </span>
            <span className="text-green-400">Innovate</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-slate-200 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A platform for polytechnic students to showcase their projects and
            get verified by HODs
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full flex items-center mx-auto" onClick={handleGetStarted}>
              Get Started
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-16 text-green-500">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "Upload Projects",
              desc: "Students can upload and showcase their project details.",
              icon: "📝",
            },
            {
              title: "HOD Verification",
              desc: "Only HOD-verified projects are published publicly.",
              icon: "✅",
            },
            {
              title: "Category Filtering",
              desc: "Explore projects by categories like Software, AI, IoT, and more.",
              icon: "🧠",
            },
          ].map(({ title, desc, icon }, i) => (
            <div
              key={i}
              className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-8 rounded-2xl shadow-xl hover:shadow-green-500/20 transition duration-300 text-center"
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-xl font-bold text-green-500 mb-2">{title}</h3>
              <p className="text-slate-500 dark:text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="categories" className="container mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-16 text-green-500">
          Project Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            {
              title: "Software",
              desc: "Web, mobile, and desktop applications",
              icon: "💻",
            },
            {
              title: "Hardware",
              desc: "Electronic and mechanical projects",
              icon: "⚙️",
            },
            {
              title: "AI",
              desc: "Machine learning and data science",
              icon: "🤖",
            },
            {
              title: "IoT",
              desc: "Internet of Things and embedded systems",
              icon: "📡",
            },
          ].map(({ title, desc, icon }, i) => (
            <motion.div
              key={i}
              className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-8 rounded-2xl shadow-md hover:shadow-green-500/20 transition duration-300 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-xl font-bold text-green-500 mb-2">{title}</h3>
              <p className="text-slate-500 dark:text-slate-400">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="dark:bg-gray-800 border bg-gray-300 rounded-md container mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
        <p className="text-center text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
        If you have to register your college, please contact us at 
          <a
            href="mailto:polyconnecthub@gmail.com"
            className="text-green-500 hover:underline ml-1"
          >
           polyconnecthub@gmail.com.
          </a>
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 py-6 mt-12 border-t border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} PolyConnectHub. All rights
            reserved.
          </p>
          <div className="flex space-x-4 text-sm">
            <a href="#home" className="hover:text-green-500">
              Home
            </a>
            <a href="#features" className="hover:text-green-500">
              Features
            </a>
            <a href="#categories" className="hover:text-green-500">
              Categories
            </a>
            <a href="#contact" className="hover:text-green-500">
              Contact
            </a>
          </div>
          <div className='fixed bottom-5 right-5 z-50'>
                          <Chatbot />
                      </div>
        </div>
      </footer>
    </div>
  );
}

export default MyHome;
