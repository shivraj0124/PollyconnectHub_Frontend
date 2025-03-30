import React, { useEffect, useState } from "react";
import themeHook from "../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import not_found from "./not_found.png";
import photo from "./profilebanner.jpg";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { FaRegCircleUser } from "react-icons/fa6";

function Profile() {
  const { userDetails, loadingMain, setLoadingMain, setUserDetails, setToken } =
    themeHook();
  const [pr, setpr] = useState([]);
  const [data2, setData2] = useState();
  const navigate = useNavigate();
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;
  const getuserproject = async () => {
    try {
      const { data } = await axios.post(
        `${VITE_BACKEND_API}/api/auth/getuprojects`,
        {
          user: userDetails._id,
        }
      );
      console.log(data);
      const response = await axios.post(
        `${VITE_BACKEND_API}/api/auth/getSingleUser`,
        {
          user: userDetails._id,
        }
      );
      console.log(response);
      setData2({
        collegeName: response?.data?.data?.allocated_college?.name,
        departmentName: response?.data?.data?.allocated_department?.name,
      });
      setpr(data.data);
    } catch (error) {}
  };

  const handleLogOut = async () => {
    setLoadingMain(true);
    try {
      setUserDetails(null);
      localStorage.removeItem("userDetails");
      localStorage.removeItem("userType");
      const token = Cookies.get("token");
      if (token) {
        Cookies.remove("token");
        setToken("");
      }
      toast.success("Logout Successfully");
      window.location.reload();
    } catch (err) {
      toast.error(err.message || "An error occurred");
    }
    setLoadingMain(false);
  };

  useEffect(() => {
    getuserproject();
  }, []);

  return (
    <div className=" md:h-[90vh] bg-[#f5f5f5] md:border-none relative">
      <img className=" h-40 w-[100%]" src={photo} />
      <div className=" grid grid-cols-1 md:grid-cols-[35%_1fr] gap-4 p-4 absolute top-20 w-[100%] md:h-[85%] ">
        <div className=" bg-white rounded-lg p-3 flex gap-2 flex-col items-center border md:border-none">
          <section>
            <FaRegCircleUser size={55} className=" text-green-700" />
          </section>
          <h1 className=" font-semibold">{userDetails?.username}</h1>

          <div className=" border w-full "></div>
          {/* <div className=" flex flex-col justify-center items-start gap-3 mt-5">
            <section className="border w-60 px-5 py-[5px] rounded-3xl bg-[#f5f5f5]">
              <h1 className=" text-sm font-semibold">name:</h1>
              <h1>{userDetails?.fullName}</h1>
            </section>
            <section className="border w-60 px-5 py-[4px] rounded-3xl bg-[#f5f5f5]">
              <h1 className=" text-sm font-semibold">email:</h1>
              <h1>{userDetails?.email}</h1>
            </section>
            <section className="border w-60 px-5 py-[4px] rounded-3xl bg-[#f5f5f5]">
              <h1 className=" text-sm font-semibold">mobile:</h1>
              <h1>{userDetails?.mobileNo}</h1>
            </section>
            <section className="border w-60 px-5 py-[4px] rounded-3xl bg-[#f5f5f5]">
              <h1 className=" text-sm font-semibold">College:</h1>
              <h1>{data2?.collegeName}</h1>
            </section>
            <section className="border w-60 px-5 py-[4px] rounded-3xl bg-[#f5f5f5]">
              <h1 className=" text-sm font-semibold">Department:</h1>
              <h1>{data2?.departmentName}</h1>
            </section>
            <button onClick={handleLogOut} className=" text-md bg-darkgreen font-semibold w-full text-white  mx-2px-4 py-[5px] rounded-3xl
            ">Log out</button>
          </div> */}

          <div className="flex flex-col justify-center items-center gap-5 rounded-2xl  bg-white w-72 mx-auto">
            {/* Profile Card */}
            <section className="w-full px-5 py-3 rounded-xl bg-[#f9f9f9] border">
              <h1 className="text-xs font-semibold text-gray-500">Name</h1>
              <p className="text-base font-medium text-gray-800">
                {userDetails?.fullName}
              </p>
            </section>

            <section className="w-full px-5 py-3 rounded-xl bg-[#f9f9f9] border">
              <h1 className="text-xs font-semibold text-gray-500">Email</h1>
              <p className="text-base font-medium text-gray-800 break-words">
                {userDetails?.email}
              </p>
            </section>

            <section className="w-full px-5 py-3 rounded-xl bg-[#f9f9f9] border">
              <h1 className="text-xs font-semibold text-gray-500">Mobile</h1>
              <p className="text-base font-medium text-gray-800">
                {userDetails?.mobileNo}
              </p>
            </section>

            <section className="w-full px-5 py-3 rounded-xl bg-[#f9f9f9] border">
              <h1 className="text-xs font-semibold text-gray-500">College</h1>
              <p className="text-base font-medium text-gray-800">
                {data2?.collegeName}
              </p>
            </section>

            <section className="w-full px-5 py-3 rounded-xl bg-[#f9f9f9] border">
              <h1 className="text-xs font-semibold text-gray-500">
                Department
              </h1>
              <p className="text-base font-medium text-gray-800">
                {data2?.departmentName}
              </p>
            </section>

            {/* Button */}
            <button
              onClick={handleLogOut}
              className="w-full bg-green-600 hover:bg-green-700 transition-all duration-200 text-white font-semibold py-2 rounded-xl shadow"
            >
              Log out
            </button>
          </div>
        </div>
        <div className=" bg-white rounded-lg h-[100%] overflow-y-auto p-5">
          <h1 className=" font-semibold text-darkgreen">Your Projects</h1>
          <div className=" md:p-3 flex flex-col gap-2">
            {pr.length === 0 ? (
              <div className=" flex   justify-center items-center font-semibold">
                <img src={not_found} className=" w-40 h-40" />
                <section>No Project Found</section>
              </div>
            ) : (
              pr.map((item, index) => (
                <div
                  key={index}
                  className=" grid grid-cols-1 min-[580px]:grid-cols-[auto_1fr] rounded-lg  gap-4 justify-center bg-[#f5f5f5] p-3"
                >
                  <img
                    src={item.multimedia[0]}
                    className="w-[200px] h-[150px] max-md:w-full rounded-xl object-cover"
                  />
                  <div className=" flex gap-2 flex-col justify-between ">
                    <div>
                      <p className=" font-semibold text-xl">
                        {item.title.charAt(0).toUpperCase() +
                          item.title.slice(1)}
                      </p>
                    </div>

                    <div className=" line-clamp-2 text-sm">
                      {item.description.charAt(0).toUpperCase() +
                        item.description.slice(1)}
                    </div>

                    <div className="flex justify-start max-md:justify-between items-center gap-2">
                      <div className=" text-xs">
                        <span className=" font-semibold">Published on : </span>
                        {new Date(item.createdAt).toISOString().split("T")[0]}
                      </div>
                    </div>

                    <div className="flex gap-2 ">
                      {item?.isActive == true ? (
                        <div className="text-xs border  bg-green-300 w-max flex justify-center items-center rounded-full bg-opacity-25 px-2 py-1 text-green-600 text-center font-semibold">
                          <span className="text-green-600 ">Verified</span>
                        </div>
                      ) : (
                        <div className="text-xs border bg-red-300 w-max flex justify-center items-center rounded-full bg-opacity-25 px-2 py-1 text-green-600 text-center font-semibold">
                          <span className="text-red-600">Not Verified</span>
                        </div>
                      )}
                      
                      <div className="text-xs border border-green-400 w-28 rounded-full bg-opacity-25 px-2 py-1 text-black text-center font-semibold">
                        
                        {item.type}
                      </div>
                      <div
                        onClick={() => {
                          navigate(`/project/${item._id}`);
                        }}
                        className="text-xs bg-green-700 text-white w-28 rounded-full cursor-pointer hover:bg-opacity-25 hover:text-green-800 px-2 py-1  text-center font-semibold"
                      >
                        Go to Project
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
