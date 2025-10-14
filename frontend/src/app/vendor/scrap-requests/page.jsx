"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaCheck, FaTimes, FaSpinner } from "react-icons/fa";

const ISSERVER = typeof window === 'undefined';

const VendorScrapRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(!ISSERVER && localStorage.getItem("user")); // vendor data

  // ✅ Fetch all scrap requests (from all users)
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/scrap-request", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setRequests(res.data);
    } catch (error) {
      toast.error("Failed to fetch scrap requests.");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Approve or reject a request
  const handleUpdateRequest = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/scrap-request/${id}`,
        { status, approvedBy: user._id },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      toast.success(`Request ${status.toLowerCase()}!`);
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status, approvedBy: user } : r))
      );
    } catch (error) {
      toast.error("Failed to update request.");
      console.error("Update error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-neutral-950 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Incoming Scrap Requests
      </h1>

      <div className="space-y-5">
        {requests.length > 0 ? (
          requests.map((req, index) => (
            <motion.div
              key={req._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-neutral-800 p-5 rounded-xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {/* Car Info */}
              <div className="flex items-center gap-4">
                <img
                  src={req.car?.image || "https://via.placeholder.com/150"}
                  alt="Car"
                  className="w-24 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="font-bold text-lg text-gray-800 dark:text-white">
                    {req.car?.brand} {req.car?.model} ({req.car?.year})
                  </p>
                  <p className="text-sm text-gray-600 dark:text-neutral-300">
                    Requested by:{" "}
                    <span className="font-medium">
                      {req.user?.name || "Unknown User"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-neutral-400 mt-1">
                    Reason: {req.reason || "Not specified"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-neutral-500 mt-1">
                    Requested on:{" "}
                    {new Date(req.requestedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Buttons / Status */}
              <div className="flex items-center gap-3 self-end sm:self-center">
                {req.status === "Pending" ? (
                  <>
                    <button
                      onClick={() => handleUpdateRequest(req._id, "Approved")}
                      className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition"
                      title="Approve"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleUpdateRequest(req._id, "Rejected")}
                      className="flex items-center justify-center w-10 h-10 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                      title="Reject"
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                      req.status === "Approved"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                    }`}
                  >
                    {req.status}
                  </span>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-neutral-400">
              No incoming scrap requests.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorScrapRequests;
