"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaCheck, FaTimes, FaSpinner, FaPlus, FaTrash } from "react-icons/fa";

const ISSERVER = typeof window === 'undefined';

const ManageScrapRequests = () => {
  const [requests, setRequests] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newRequest, setNewRequest] = useState({ car: "", reason: "" });
  const user = JSON.parse(!ISSERVER && localStorage.getItem("user"));

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/scrap-request/user`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setRequests(res.data);
    } catch {
      toast.error("Failed to fetch scrap requests.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCars = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/car/user`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCars(res.data);
    } catch {
      toast.error("Failed to fetch your cars.");
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchCars();
  }, []);

  const handleAddRequest = async (e) => {
    e.preventDefault();
    if (!newRequest.car || !newRequest.reason.trim()) {
      toast.error("Please select a car and provide a reason.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = { car: newRequest.car, reason: newRequest.reason };
      await axios.post(`http://localhost:5000/scrap-request`, payload, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("Scrap request submitted!");
      setNewRequest({ car: "", reason: "" });
      fetchRequests();
    } catch {
      toast.error("Failed to submit scrap request.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateRequest = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/scrap-request/${id}`, { status });
      toast.success(`Request has been ${status.toLowerCase()}.`);
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status } : r))
      );
    } catch {
      toast.error("Failed to update the request status.");
    }
  };

  const handleDeleteRequest = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    try {
      await axios.delete(`http://localhost:5000/scrap-request/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("Request deleted successfully!");
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch {
      toast.error("Failed to delete the request.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 py-10">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
        Manage Scrap Requests
      </h1>

      {/* Add New Request Form */}
      <motion.form
        onSubmit={handleAddRequest}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-200 shadow-md p-6 rounded-2xl mb-10 flex flex-col sm:flex-row gap-4"
      >
        <select
          value={newRequest.car}
          onChange={(e) =>
            setNewRequest({ ...newRequest, car: e.target.value })
          }
          className="flex-1 border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Car</option>
          {cars.map((c) => (
            <option key={c._id} value={c._id}>
              {c.brand} {c.model} ({c.year})
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Reason for scrapping"
          value={newRequest.reason}
          onChange={(e) =>
            setNewRequest({ ...newRequest, reason: e.target.value })
          }
          className="flex-1 border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={submitting}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          {submitting ? (
            <FaSpinner className="animate-spin text-sm" />
          ) : (
            <FaPlus className="text-sm" />
          )}
          Add Request
        </button>
      </motion.form>

      {/* Request List */}
      <div className="space-y-6">
        {requests.length > 0 ? (
          requests.map((req, index) => {
            const requestDate = new Date(req.createdAt || req.requestedAt);
            const formattedDate = requestDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <motion.div
                key={req._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-800 p-5 rounded-xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
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
                    <p className="text-sm text-gray-600 dark:text-neutral-300 mt-1">
                      Reason: {req.reason || "Not specified"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1">
                      📅 Requested on: {formattedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  {req.status === "Pending" ? (
                    <>
                      <button
                        onClick={() => handleUpdateRequest(req._id, "Approved")}
                        className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition"
                        title="Approve"
                      >
                        <FaCheck className="text-base" />
                      </button>
                      <button
                        onClick={() => handleUpdateRequest(req._id, "Rejected")}
                        className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                        title="Reject"
                      >
                        <FaTimes className="text-base" />
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

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteRequest(req._id)}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 dark:bg-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-600 transition"
                    title="Delete Request"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-20 text-gray-500 text-lg">
            You have no scrap requests yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageScrapRequests;

