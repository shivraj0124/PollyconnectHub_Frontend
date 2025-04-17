import React from "react";
import themeHook from "./Context";
import { FaUserCircle } from "react-icons/fa";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaProjectDiagram } from "react-icons/fa";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
function Navbar() {
  const { userDetails, theme, setTheme } = themeHook();
  const navigate = useNavigate();
  const handleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };
  return (
    <div className="flex flex-row dark:bg-slate-950 bg-white px-5 py-3 justify-between items-center dark:border-gray-500 border-b-2 border-gray-300 sticky top-0">
      <div className="flex justify-center items-end text-green-800 ">
        <FaProjectDiagram size={40} />
        <h1 className="text-lg font-bold text-green-600 cursor-pointer">
          <Link to={"/"}>
            <i>PolyConnectHub</i>
          </Link>
        </h1>
      </div>
      <div className="flex gap-5 justify-center items-center">
        <div
          className="cursor-pointer dark:text-white text-black"
          onClick={handleTheme}
        >
          {theme === "light" ? (
            <MdOutlineDarkMode color="black" size={24} />
          ) : (
            <MdOutlineLightMode color="white" size={24} />
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
            <FaUserCircle className=" text-darkgreen" size={40}></FaUserCircle>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
