"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaSpinner, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";

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
      console.log(res.data);
      
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
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-neutral-950 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Manage Cars
      </h1>

      <div className="space-y-5">
        {cars.length > 0 ? (
          cars.map((car, index) => (
            <motion.div
              key={car._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-neutral-800 p-5 rounded-xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={car.image || "https://via.placeholder.com/150"}
                  alt="Car"
                  className="w-24 h-16 object-cover rounded-lg"
                />
                {editingCar === car._id ? (
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <input
                      type="text"
                      value={editData.brand}
                      onChange={(e) =>
                        setEditData({ ...editData, brand: e.target.value })
                      }
                      className="border border-gray-300 rounded-lg p-2 dark:bg-neutral-900 dark:text-white"
                    />
                    <input
                      type="text"
                      value={editData.model}
                      onChange={(e) =>
                        setEditData({ ...editData, model: e.target.value })
                      }
                      className="border border-gray-300 rounded-lg p-2 dark:bg-neutral-900 dark:text-white"
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
                      className="border border-gray-300 rounded-lg p-2 dark:bg-neutral-900 dark:text-white"
                    />
                    <input
                      type="text"
                      value={editData.regNumber}
                      onChange={(e) =>
                        setEditData({ ...editData, regNumber: e.target.value })
                      }
                      className="border border-gray-300 rounded-lg p-2 dark:bg-neutral-900 dark:text-white"
                    />
                    <input
                      type="number"
                      value={editData.year}
                      onChange={(e) =>
                        setEditData({ ...editData, year: e.target.value })
                      }
                      className="border border-gray-300 rounded-lg p-2 dark:bg-neutral-900 dark:text-white"
                    />
                    <input
                      type="text"
                      value={editData.image}
                      onChange={(e) =>
                        setEditData({ ...editData, image: e.target.value })
                      }
                      className="border border-gray-300 rounded-lg p-2 dark:bg-neutral-900 dark:text-white col-span-2"
                    />
                  </div>
                ) : (
                  <div>
                    <p className="font-bold text-lg text-gray-800 dark:text-white">
                      {car.brand} {car.model} ({car.year})
                    </p>
                    <p className="text-sm text-gray-500 dark:text-neutral-400">
                      Chassis: {car.chassisNumber}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-neutral-400">
                      Reg: {car.regNumber}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
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
                      className="flex items-center justify-center w-10 h-10 bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-200 transition"
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
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-neutral-400">
              You have no cars to manage.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCars;
