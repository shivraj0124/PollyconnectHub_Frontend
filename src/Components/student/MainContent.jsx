import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ss from "./ss.jpg";
import tt from "./tt.jpg";
import jj from "./jj.jpg";
import banner4 from "../../assets/banner4.jpg";
import banner5 from "../../assets/banner5.jpg";
import { Carousel } from "react-responsive-carousel";
import photo from "./not_found.png";
import { motion, AnimatePresence } from "framer-motion";
import themeHook from "../Context";
import { HiSearch } from "react-icons/hi";
import { TbLayoutGrid } from "react-icons/tb";
import { MdOutlineRocketLaunch } from "react-icons/md";

function MainContent() {
  const [projectData, setProjectData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;
  const { theme } = themeHook();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${VITE_BACKEND_API}/api/project/getallprojects`
        );
        setProjectData(res.data.data.data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [search === ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${VITE_BACKEND_API}/api/project/search`, {
        title: search,
      });
      setProjectData(res.data.data.projects);
    } catch (error) {
      console.error("Error searching projects:", error);
    }
    setLoading(false);
  };

  const bannerArr = [
    { img: ss, alt: "Slide 1" },
    { img: tt, alt: "Slide 2" },
    { img: jj, alt: "Slide 3" },
    { img: banner4, alt: "Slide 4" },
    { img: banner5, alt: "Slide 5" },
  ];

  /* ── Skeleton card ── */
  const SkeletonCard = () => (
    <div
      className={`rounded-2xl border p-5 animate-pulse
        ${theme === "dark"
          ? "bg-white/[0.03] border-white/[0.07]"
          : "bg-white border-slate-200"}`}
    >
      <div className={`h-4 rounded-full mb-3 w-3/4 ${theme === "dark" ? "bg-white/10" : "bg-slate-200"}`} />
      <div className={`h-3 rounded-full mb-2 w-full ${theme === "dark" ? "bg-white/[0.07]" : "bg-slate-100"}`} />
      <div className={`h-3 rounded-full w-2/3 ${theme === "dark" ? "bg-white/[0.07]" : "bg-slate-100"}`} />
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .main-content { font-family: 'Plus Jakarta Sans', sans-serif; }
        .syne { font-family: 'Syne', 'Plus Jakarta Sans', sans-serif; }

        /* Carousel dot overrides */
        .carousel .control-dots .dot {
          background: #22c55e !important;
          box-shadow: none !important;
          width: 6px !important;
          height: 6px !important;
        }
        .carousel .control-arrow {
          background: rgba(0,0,0,0.25) !important;
          border-radius: 8px !important;
        }
        .carousel .control-arrow:hover {
          background: rgba(0,0,0,0.45) !important;
        }

        /* Scrollbar */
        .main-scroll::-webkit-scrollbar { width: 4px; }
        .main-scroll::-webkit-scrollbar-track { background: transparent; }
        .main-scroll::-webkit-scrollbar-thumb { background: #22c55e44; border-radius: 99px; }
      `}</style>

      <div
        className={`main-content main-scroll w-full flex flex-col h-[93vh] overflow-y-auto transition-colors duration-300
          ${theme === "dark" ? "bg-[#060d09]" : "bg-[#f5faf6]"}`}
      >
        <div className="flex flex-col gap-6 p-3 sm:p-5 w-full max-w-4xl mx-auto">

          {/* ── Hero tagline ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex items-start gap-2 sm:gap-3 rounded-2xl border p-3 sm:p-4
              ${theme === "dark"
                ? "bg-emerald-900/15 border-emerald-800/30"
                : "bg-emerald-50 border-emerald-200"}`}
          >
            <div
              className={`flex-shrink-0 w-8 sm:w-9 h-8 sm:h-9 rounded-xl flex items-center justify-center mt-0.5
                ${theme === "dark" ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-200 text-emerald-700"}`}
            >
              <MdOutlineRocketLaunch size={16} />
            </div>
            <p
              className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                theme === "dark" ? "text-emerald-300" : "text-emerald-800"
              }`}
            >
              Empowering Polytechnic Communities through Shared Knowledge —
              Building Bridges, Inspiring Innovation.
            </p>
          </motion.div>

          {/* ── Carousel ── */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`w-full rounded-2xl overflow-hidden border shadow-sm
              ${theme === "dark" ? "border-white/[0.07]" : "border-slate-200"}`}
          >
            <Carousel
              axis="horizontal"
              showThumbs={false}
              autoPlay
              interval={3000}
              infiniteLoop
              swipeable
              showStatus={false}
            >
              {bannerArr.map((item, index) => (
                <div key={index}>
                  <img
                    className="w-full h-[150px] sm:h-[220px] object-cover"
                    src={item.img}
                    alt={item.alt}
                  />
                </div>
              ))}
            </Carousel>
          </motion.section>

          {/* ── Projects section ── */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Header row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0
                    ${theme === "dark"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-emerald-100 text-emerald-700"}`}
                >
                  <TbLayoutGrid size={16} />
                </div>
                <h2
                  className={`syne text-lg sm:text-xl font-700 ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  Projects
                </h2>
                {!loading && projectData.length > 0 && (
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full
                      ${theme === "dark"
                        ? "bg-emerald-900/40 text-emerald-400 border border-emerald-800/40"
                        : "bg-emerald-100 text-emerald-700 border border-emerald-200"}`}
                  >
                    {projectData.length}
                  </span>
                )}
              </div>

              {/* Search */}
              <form onSubmit={handleSubmit} className="w-full sm:w-auto">
                <div
                  className={`flex items-center gap-2 rounded-xl border px-2.5 sm:px-3 py-1.5 sm:py-2 transition-all duration-200
                    focus-within:ring-2 focus-within:ring-emerald-500/40
                    ${theme === "dark"
                      ? "bg-white/[0.04] border-white/[0.08] focus-within:border-emerald-600/50"
                      : "bg-white border-slate-200 focus-within:border-emerald-400 shadow-sm"}`}
                >
                  <HiSearch
                    size={15}
                    className={theme === "dark" ? "text-slate-500" : "text-slate-400"}
                  />
                  <input
                    type="text"
                    placeholder="Search…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`bg-transparent text-xs sm:text-sm font-medium outline-none w-full sm:w-44
                      ${theme === "dark"
                        ? "text-white placeholder-slate-600"
                        : "text-slate-800 placeholder-slate-400"}`}
                  />
                </div>
              </form>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-4 min-h-[160px]">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="skeletons"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 gap-4"
                  >
                    {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
                  </motion.div>
                ) : projectData.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className={`flex flex-col items-center justify-center py-16 rounded-2xl border
                      ${theme === "dark"
                        ? "bg-white/[0.02] border-white/[0.07]"
                        : "bg-white border-slate-200 shadow-sm"}`}
                  >
                    <img src={photo} className="w-28 h-28 mb-4 opacity-60" alt="Not found" />
                    <p
                      className={`font-bold text-base mb-1 ${
                        theme === "dark" ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      No Projects Found
                    </p>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-slate-600" : "text-slate-400"
                      }`}
                    >
                      Try a different search term
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 gap-4"
                  >
                    {projectData.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <ProjectCard data={item} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}

export default MainContent;