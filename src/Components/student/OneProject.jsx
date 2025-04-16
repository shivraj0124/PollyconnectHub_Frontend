import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import themeHook from "../Context";
import toast from "react-hot-toast";

function OneProject() {
  const [projectdata, setProjectdata] = useState([]);
  const { token, userDetails } = themeHook();
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;
  const { id } = useParams();

  const getProjectdata = async () => {
    const res = await axios.post(
      `${VITE_BACKEND_API}/api/project/getoneproject`,
      { project_id: id }
    );
    console.log(res?.data?.data?.data[0]);
    setProjectdata(res?.data?.data?.data[0]);
  };

  const save = async () => {
    const { data } = await axios.post(
      `${VITE_BACKEND_API}/api/save/add`,
      {
        project_id: id,
        user_id: userDetails._id,
      },
      {
        headers: {
          authentication: `Bearer ${token}`,
        },
      }
    );
    if (data.data.status) {
      toast.success("Saved successfully");
    }
  };

  useEffect(() => {
    getProjectdata();
  }, []);

  return (
    <div className="sm:h-[90vh] flex justify-center">
      <div className="p-6 bg-white flex flex-col mt-5 rounded-xl border w-[90%] max-w-3xl shadow-md overflow-y-auto space-y-4">
        {/* Project Image */}
        <img
          src={projectdata?.multimedia}
          alt="Project"
          className="w-full h-[400px] rounded-xl object-cover border"
        />

        {/* Project Title */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-green-700 capitalize">
            {projectdata?.title}
          </h1>
          <h1 className="text-md font-bold text-black capitalize">
            <span>Created By: </span>
            <a className="text-blue-500" href={userDetails?._id === projectdata?.created_By?._id ? '/profile' :`/profile/${projectdata?.created_By?._id}`}>{userDetails?._id === projectdata?.created_By?._id ? 'You':projectdata?.created_By?.username}</a>
          </h1>
        </div>

        {/* Type & Date */}
        <div className="flex flex-wrap gap-3 text-sm">
          {projectdata?.isActive == "true" ? (
            <div className="text-xs border w-28 bg-green-300  flex justify-center items-center rounded-full bg-opacity-25 px-2 py-1 text-green-600 text-center font-semibold">
              <span className="text-gree  n-600 ">Verified</span>
            </div>
          ) : (
            <div className="text-xs border bg-red-300 w-24 flex justify-center items-center rounded-full bg-opacity-25 px-2 py-1 text-green-600 text-center font-semibold">
              <span className="text-red-600">Not Verified</span>
            </div>
          )}
          <div className="text-xs border border-green-400 w-28 rounded-full bg-opacity-25 px-2 py-1 text-black text-center font-semibold flex justify-center items-center">
            {projectdata.type}
          </div>
          <div className="px-3 py-1 rounded-full border text-white bg-green-700">
            <span className="font-semibold text-white">Posted At:</span>{" "}
            {projectdata?.createdAt
              ? new Date(projectdata.createdAt).toISOString().split("T")[0]
              : "N/A"}
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="font-semibold mb-1">Description:</h2>
          <p className="text-gray-600">{projectdata?.description}</p>
        </div>

        {/* Contributors */}

        <div>
          <h2 className="font-semibold mb-1">Contributors:</h2>
          {projectdata?.contributers?.map((item, index) => (
            <a href={`/profile/${item?._id}`} className="text-blue-600">
              @{item?.username}
            </a>
          ))}
        </div>

        {/* College */}
        <div>
          <h2 className="font-semibold mb-1">College Name:</h2>
          <p className="text-gray-600">
            {projectdata?.allocated_college?.name}
          </p>
        </div>

        {/* Department */}
        <div>
          <h2 className="font-semibold mb-1">Department Name:</h2>
          <p className="text-gray-600">
            {projectdata?.allocated_department?.name}
          </p>
        </div>

        {/* Live Demo */}
        <div>
          <h2 className="font-semibold mb-1">Live Demo:</h2>
          <a
            href={projectdata?.live_demo}
            target="_blank"
            className="text-blue-500 underline"
          >
            {projectdata?.live_demo}
          </a>
        </div>

        {/* Code Link */}
        {projectdata?.codeLink && (
          <div>
            <h2 className="font-semibold mb-1">Code:</h2>
            <a
              href={projectdata?.codeLink}
              target="_blank"
              className="text-blue-500 underline"
            >
              {projectdata?.codeLink}
            </a>
          </div>
        )}

        {/* Save Button */}
        {/* <button
          onClick={save}
          className="bg-green-600 hover:bg-green-700 transition-all duration-200 text-white font-semibold py-2 rounded-xl w-full shadow"
        >
          Save Project
        </button> */}
      </div>
    </div>
  );
}

export default OneProject;
