import React, { useState } from "react";
import { Link } from "react-router-dom";
import photo from "./loginImage.png";
import axios from "axios";
import themeHook from "../Context";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function New_login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const { userDetails, setUserDetails, setToken } = themeHook();
  const navigate = useNavigate();
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;
  const hadlesubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${VITE_BACKEND_API}/api/auth/login`,
        {
          username: username,
          password: password,
        }
      );
      console.log("hello", response.data.data);
      if (response.data.data.status) {
        setUserDetails(response.data.data.existuser);
        Cookies.set("token", response.data.data.token);
        localStorage.setItem(
          "userDetails",
          JSON.stringify(response.data.data.existuser)
        );
        setToken(response.data.data.token);
        console.log(response.data.data.existuser.userType);
        if (response.data.data.existuser.userType === "student") {
          navigate("/");
        } else if (response.data.data.existuser.userType === "admin") {
          navigate("/Admin/Dashboard");
        } else if (response.data.data.existuser.userType === "poc") {
          navigate("/Poc/Dashboard");
        } else if (response.data.data.existuser.userType === "HOD") {
          navigate("/Hod/Dashboard");
        }
      } else {
        toast.error(response.data.data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setusername("")
    setpassword("")
  };

  return (
    <div className=" flex flex-col md:flex-row h-screen">
      <div className="md:w-[50%] h-[40%] md:h-[100%] w-[100%] p-2 flex justify-center items-center">
        <img src={photo} alt="Login" className=" w-[100%] h-[100%] object-contain" />
      </div>
      <div className="md:w-[35%] w-[100%] h-[60%] md:h-[100%] flex flex-col justify-center items-start p-3 sm:p-2">
        <h1 className=" text-xl ">
          Welcome To<br />
          <span className=" text-textgreen text-3xl font-bold">
            PolyConnectHub
          </span>
        </h1>
        <form onSubmit={hadlesubmit} className=" w-full flex flex-col gap-3">
          <label className=" font-semibold mt-2">USERNAME</label>
          <input
            type="text"
            className=" border bg-[#f5f5f5] w-[100%] rounded-md px-3  py-[7px] focus:outline-none"
            placeholder="username"
            value={username}
            onChange={(e) => setusername(e.target.value)} // Update the username state
          />
          <label className=" font-semibold">PASSWORD</label>
          <input
            type="password"
            className=" border bg-[#f5f5f5] w-[100%] rounded-md px-3  py-[7px] focus:outline-none"
            placeholder="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)} // Update the password state
          />
          <section className="flex w-full flex-col justify-center items-center mt-2">
            <button className=" bg-[#57CC99] rounded-lg font-semibold bg-opacity-25 px-3 py-2 text-green-600 w-[100%] ">
              login
            </button>
            <Link to={"/SignUp"} className=" mt-3 text-blue-500">
              Register
            </Link>
          </section>
        </form>
      </div>
    </div>
  );
}

export default New_login;
