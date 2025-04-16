import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import themeHook from "../Context";
function CollegeCard({ data,call }) {
  const navigate = useNavigate();
  const Navigate = useNavigate();
  const { userDetails } = themeHook();
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;
  const [showModal, setShowModal] = useState(false);
  const subscribeToCollege = async (studentId, collegeId) => {
    try {
      const response = await axios.post(
        `${VITE_BACKEND_API}/api/college/subscribe`,
        {
          studentId: userDetails?._id,
          collegeId: data._id,
        }
      );
      console.log(response.data);
      toast.success("Subscribed successfully");
      call();
    } catch (error) {
      console.error(
        "Subscription failed:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const unsubscribeFromCollege = async (studentId, collegeId) => {
    try {
      const response = await axios.post(
        `${VITE_BACKEND_API}/api/college/unsubscribe`,
        {
          studentId: userDetails?._id,
          collegeId: data._id,
        }
      );
      console.log(response.data);
      toast.success(response.data.message);
      setShowModal(!showModal);
      call()
      return response.data;
    } catch (error) {
      console.error(
        "Unsubscription failed:",
        error.response?.data || error.message
      );
      throw error;
    }
    setShowModal(false);
  };

  return (
    <div className="cursor-pointer flex flex-col rounded-lg bg-white">
      <img
        src={
          data.photo
            ? data.photo
            : "https://www.festivalsfromindia.com/wp-content/uploads/2022/04/VJTI-Mumbai.-Photo-VJTI-Mumbai-1_11zon.jpg"
        }
        className="w-full h-40 object-cover"
        onClick={() => navigate(`/collage/${data._id}`)}
      />
      <div className="flex justify-between">
        <div className=" p-4" onClick={() => navigate(`/collage/${data._id}`)}>
          <h1 className=" font-semibold text-darkgreen">{data.name}</h1>
          <h1 className=" line-clamp-3 ">{data.about}</h1>
          <h1 className=" text-sm text-gray-500">
            <span className=" font-semibold">address:</span> {data.address}
          </h1>
        </div>
        <div className="px-2 flex justify-end items-end mb-2">
          {!data?.isSubscribed ? (
            <button
              className="p-1 px-2 border rounded-md bg-green-500 text-white hover:bg-opacity-75"
              onClick={subscribeToCollege}
            >
              Subscribe
            </button>
          ) : (
            <button
              className="p-1 px-2 border rounded-md bg-gray-500 text-white hover:bg-opacity-75"
              onClick={() => setShowModal(true)}
            >
              Unsubscribe
            </button>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to unsubscribe from {data?.name}?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => {
                  unsubscribeFromCollege();
                  setShowModal(false);
                }}
              >
                Yes, Unsubscribe
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CollegeCard;
