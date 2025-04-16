import React, { useEffect, useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { MdComment } from "react-icons/md";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function ProjectCard2({ data }) {
  const navigate = useNavigate();
  const [collegeName, setCollegeName] = useState("");
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;

  useEffect(() => {
    const fetchCollegeName = async () => {
      try {
        const response = await axios.post(`${VITE_BACKEND_API}/api/college/onecollge`, {
          college: data?.allocated_college,
        });
        setCollegeName(response.data?.data);
      } catch (error) {
        console.error("Error fetching college name:", error);
      }
    };

    if (data?.allocated_college) {
      fetchCollegeName();
    }
  }, [data?.allocated_college, VITE_BACKEND_API]);

  return (
    <div
      className="flex flex-col bg-white gap-4 rounded-lg w-full px-6 py-6 cursor-pointer"
      onClick={() => navigate(`/project/${data?._id}`)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6">
        <img
          src={
            data?.imageUrl ||
            "https://i0.wp.com/technologysalon.org/wp-content/uploads/2019/04/artificial-intelligence.jpg?resize=640%2C429"
          }
          alt="Project"
          className="w-full sm:w-44 h-44 rounded-xl object-cover"
        />
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-md">{data?.title}</p>
          <p className="text-gray-500 text-xs">
            <span className="font-semibold">Published By: </span>
            {data?.created_By?.fullName || "Unknown"}
          </p>
          <p className="text-gray-500 text-xs">
            <span className="font-semibold">College Name: </span>
            { data?.allocated_college?.name || "N/A"}
          </p>
          <p className="text-gray-500 text-xs">
            <span className="font-semibold">Type: </span>
            {data?.type || "N/A"}
          </p>
          <p className="text-gray-500 text-sm line-clamp-3">
            <span className="font-semibold text-sm">Description: </span>
            {data?.description || "No description provided."}
          </p>
          <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-500 mt-2 sm:items-end">
            <span className="font-semibold">
              Published on: {moment(data?.time).format("YYYY-MM-DD")}
            </span>
            <button
              className="bg-[#57CC99] rounded-full bg-opacity-25 px-3 py-2 text-green-600 font-semibold cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/project/${data?._id}`);
              }}
            >
              Go to Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard2;
