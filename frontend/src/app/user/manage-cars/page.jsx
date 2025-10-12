"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FaSpinner,
  FaTrash,
  FaEdit,
  FaSave,
  FaTimes,
  FaCarSide,
} from "react-icons/fa";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [editData, setEditData] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/car/user", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCars(res.data);
    } catch {
      toast.error("Failed to fetch cars.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    try {
      await axios.delete(`http://localhost:5000/car/delete/${id}`);
      toast.success("Car deleted successfully!");
      setCars((prev) => prev.filter((c) => c._id !== id));
    } catch {
      toast.error("Failed to delete car.");
    }
  };

  const handleEdit = (car) => {
    setEditingCar(car._id);
    setEditData({
      brand: car.brand,
      model: car.model,
      chassisNumber: car.chassisNumber,
      regNumber: car.regNumber,
      year: car.year,
      image: car.image || "",
    });
  };

  const handleCancelEdit = () => {
    setEditingCar(null);
    setEditData({});
  };

  const handleSave = async (id) => {
    setSubmitting(true);
    try {
      await axios.put(`http://localhost:5000/car/update/${id}`, editData);
      toast.success("Car updated successfully!");
      fetchCars();
      setEditingCar(null);
    } catch {
      toast.error("Failed to update car.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F9FAFB]">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-4 sm:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col items-center mb-10">
        <FaCarSide className="text-blue-600 text-5xl mb-3" />
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center">
          Manage Your Cars
        </h1>
        <p className="text-gray-500 text-sm mt-1 text-center">
          View, edit, or delete your added vehicles easily.
        </p>
      </div>

      {/* Cars List */}
      <div className="max-w-5xl mx-auto space-y-6">
        {cars.length > 0 ? (
          cars.map((car, index) => (
            <motion.div
              key={car._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {/* Car Image + Info */}
              <div className="flex items-center gap-5 flex-1 w-full">
                <img
                  src={car.image || "https://via.placeholder.com/150"}
                  alt="Car"
                  className="w-28 h-20 object-cover rounded-lg border border-gray-200"
                />
                {editingCar === car._id ? (
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <input
                      type="text"
                      value={editData.brand}
                      onChange={(e) =>
                        setEditData({ ...editData, brand: e.target.value })
                      }
                      placeholder="Brand"
                      className="border border-gray-300 rounded-lg p-2"
                    />
                    <input
                      type="text"
                      value={editData.model}
                      onChange={(e) =>
                        setEditData({ ...editData, model: e.target.value })
                      }
                      placeholder="Model"
                      className="border border-gray-300 rounded-lg p-2"
                    />
                    <input
                      type="text"
                      value={editData.chassisNumber}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          chassisNumber: e.target.value,
                        })
                      }
                      placeholder="Chassis No"
                      className="border border-gray-300 rounded-lg p-2"
                    />
                    <input
                      type="text"
                      value={editData.regNumber}
                      onChange={(e) =>
                        setEditData({ ...editData, regNumber: e.target.value })
                      }
                      placeholder="Reg No"
                      className="border border-gray-300 rounded-lg p-2"
                    />
                    <input
                      type="number"
                      value={editData.year}
                      onChange={(e) =>
                        setEditData({ ...editData, year: e.target.value })
                      }
                      placeholder="Year"
                      className="border border-gray-300 rounded-lg p-2"
                    />
                    <input
                      type="text"
                      value={editData.image}
                      onChange={(e) =>
                        setEditData({ ...editData, image: e.target.value })
                      }
                      placeholder="Image URL"
                      className="border border-gray-300 rounded-lg p-2 col-span-2"
                    />
                  </div>
                ) : (
                  <div>
                    <p className="font-semibold text-lg text-gray-800">
                      {car.brand} {car.model} ({car.year})
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">Chassis:</span>{" "}
                      {car.chassisNumber}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">Reg:</span>{" "}
                      {car.regNumber}
                    </p>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                {editingCar === car._id ? (
                  <>
                    <button
                      onClick={() => handleSave(car._id)}
                      disabled={submitting}
                      className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition"
                      title="Save"
                    >
                      {submitting ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaSave />
                      )}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition"
                      title="Cancel"
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(car)}
                      className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="flex items-center justify-center w-10 h-10 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-600">🚗 You have no cars added yet.</p>
            <p className="text-sm text-gray-400 mt-2">
              Add a car to start managing your collection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCars;

