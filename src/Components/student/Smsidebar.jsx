import React from "react";
import { BiHome, BiUserCircle } from "react-icons/bi";
import { IoSchoolOutline } from "react-icons/io5";
import { GoProjectSymlink } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import themeHook from "../Context";

function Smsidebar() {
  const { userDetails, theme } = themeHook();
  const location = useLocation();

  // Helper to check active route
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-row max-sm:text-sm w-full overflow-x-auto justify-between bg-white dark:bg-[#121212] text-black dark:text-white dark:border-none border-t border-gray-300 py-2 px-1">
      
      <ul className="flex flex-row w-full gap-2">

        {/* Home */}
        <Link
          to="/visit"
          className={`${
            isActive("/visit")
              ? "bg-gray-200 dark:bg-gray-700 text-green-600"
              : ""
          } hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer grid grid-cols-[auto_1fr] gap-2 px-4 py-2 font-semibold rounded-lg`}
        >
          <div className="flex items-center">
            <BiHome size={22} />
          </div>
          <div>Home</div>
        </Link>

        {/* College */}
        <Link
          to="/college"
          className={`${
            isActive("/college")
              ? "bg-gray-200 dark:bg-gray-700 text-green-600"
              : ""
          } hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer grid grid-cols-[auto_1fr] gap-2 px-4 py-2 font-semibold rounded-lg`}
        >
          <div className="flex items-center">
            <IoSchoolOutline size={22} />
          </div>
          <div>College</div>
        </Link>

        {/* Student Projects */}
        {userDetails?.userType === "student" && (
          <Link
            to="/StudentProjects"
            className={`${
              isActive("/StudentProjects")
                ? "bg-gray-200 dark:bg-gray-700 text-green-600"
                : ""
            } hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer grid grid-cols-[auto_1fr] gap-2 px-4 py-2 font-semibold rounded-lg`}
          >
            <div className="flex items-center">
              <GoProjectSymlink size={22} />
            </div>
            <div>Projects</div>
          </Link>
        )}

        {/* Profile */}
        {userDetails?.userType === "student" && (
          <Link
            to="/profile"
            className={`${
              isActive("/profile")
                ? "bg-gray-200 dark:bg-gray-700 text-green-600"
                : ""
            } hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer grid grid-cols-[auto_1fr] gap-2 px-4 py-2 font-semibold rounded-lg`}
          >
            <div className="flex items-center">
              <BiUserCircle size={22} />
            </div>
            <div>Profile</div>
          </Link>
        )}

      </ul>
    </div>
  );
}

export default Smsidebar;