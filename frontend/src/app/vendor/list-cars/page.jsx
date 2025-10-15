"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEdit,
  FaTrash,
  FaTimes,
  FaBroom,
} from "react-icons/fa";

const ListCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalImg, setModalImg] = useState(null);
  const [editCar, setEditCar] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [filters, setFilters] = useState({ brand: "", model: "", year: "" });

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/car/getall");
      setCars(res.data);
    } catch (error) {
      toast.error("Failed to fetch cars.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await axios.delete(`http://localhost:5000/car/delete/${id}`);
        toast.success("Car deleted successfully!");
        fetchCars();
      } catch {
        toast.error("Failed to delete car.");
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      await axios.put(`http://localhost:5000/car/update/${editCar._id}`, editCar);
      toast.success("Car updated successfully!");
      setEditCar(null);
      fetchCars();
    } catch {
      toast.error("Failed to update car.");
    }
    setEditLoading(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => setFilters({ brand: "", model: "", year: "" });

  const brands = Array.from(new Set(cars.map((c) => c.brand))).sort();
  const models = Array.from(new Set(cars.map((c) => c.model))).sort();
  const years = Array.from(new Set(cars.map((c) => c.year))).sort((a, b) => b - a);

  const filteredCars = cars.filter(
    (c) =>
      (!filters.brand || c.brand === filters.brand) &&
      (!filters.model || c.model === filters.model) &&
      (!filters.year || c.year.toString() === filters.year)
  );

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-gray-600 dark:text-gray-300">
        Loading car list...
      </div>
    );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent mb-2">
          Manage Car Listings
        </h1>
        <p className="text-gray-600 dark:text-neutral-400 text-sm">
          View, filter, and edit your listed vehicles.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="mb-8 p-6 bg-white/70 dark:bg-neutral-800/70 backdrop-blur-md rounded-2xl shadow-md border border-gray-200 dark:border-neutral-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-200 mb-4">
          Filters
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <select
            name="brand"
            value={filters.brand}
            onChange={handleFilterChange}
            className="p-2 rounded-lg border border-gray-300 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
          >
            <option value="">All Brands</option>
            {brands.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <select
            name="model"
            value={filters.model}
            onChange={handleFilterChange}
            className="p-2 rounded-lg border border-gray-300 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
          >
            <option value="">All Models</option>
            {models.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
          <select
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            className="p-2 rounded-lg border border-gray-300 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>

          <button
            onClick={clearFilters}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-neutral-600 dark:to-neutral-700 hover:scale-[1.03] transition rounded-lg p-2 text-sm font-medium"
          >
            <FaBroom /> Clear Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-neutral-700"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 dark:bg-neutral-900/60">
              <tr className="text-gray-600 dark:text-neutral-300 text-sm uppercase tracking-wider">
                <th className="p-4">Image</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Model</th>
                <th className="p-4">Year</th>
                <th className="p-4">Reg. No.</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.map((car) => (
                <motion.tr
                  key={car._id}
                  layout
                  className="border-t dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition"
                >
                  <td className="p-4">
                    <img
                      src={car.image}
                      alt={car.model}
                      className="w-16 h-12 object-cover rounded-md cursor-pointer hover:scale-105 transition"
                      onClick={() => setModalImg(car.image)}
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-800 dark:text-white">{car.brand}</td>
                  <td className="p-4 text-gray-600 dark:text-neutral-300">{car.model}</td>
                  <td className="p-4 text-gray-600 dark:text-neutral-300">{car.year}</td>
                  <td className="p-4 text-gray-600 dark:text-neutral-300">{car.regNumber}</td>
                  <td className="p-4 flex gap-4">
                    <button
                      onClick={() => setEditCar(car)}
                      className="text-blue-500 hover:text-blue-600 transition"
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="text-red-500 hover:text-red-600 transition"
                      title="Delete"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Image Modal */}
      <AnimatePresence>
        {modalImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
            onClick={() => setModalImg(null)}
          >
            <motion.img
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              src={modalImg}
              alt="Car"
              className="max-w-3xl max-h-[80vh] rounded-xl shadow-2xl"
            />
            <FaTimes className="absolute top-6 right-8 text-white text-2xl cursor-pointer" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {editCar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
          >
            <motion.div
              initial={{ y: -30 }}
              animate={{ y: 0 }}
              className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-2xl w-full max-w-md"
            >
              <h2 className="text-2xl font-semibold mb-6 dark:text-white">Edit Car</h2>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                {["brand", "model", "year", "regNumber", "chassisNumber"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 capitalize">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type={field === "year" ? "number" : "text"}
                      value={editCar[field] || ""}
                      onChange={(e) =>
                        setEditCar({ ...editCar, [field]: e.target.value })
                      }
                      className="mt-1 p-2 w-full rounded-lg border border-gray-300 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                    Car Image
                  </label>
                  <div className="flex items-center gap-4">
                    {editCar.image && (
                      <img
                        src={editCar.image}
                        alt="Car"
                        className="w-24 h-16 object-cover rounded-lg"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setEditCar({
                          ...editCar,
                          newImageFile: e.target.files[0],
                        })
                      }
                      className="w-full text-sm text-gray-700 dark:text-neutral-200"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditCar(null)}
                    className="px-4 py-2 bg-gray-200 dark:bg-neutral-700 rounded-lg text-gray-800 dark:text-white hover:scale-105 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={editLoading}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition"
                  >
                    {editLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ListCars;
