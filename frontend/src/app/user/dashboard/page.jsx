"use client";
import React, { useEffect, useState } from "react";
import {
  FaCar,
  FaWrench,
  FaCheckCircle,
  FaClock,
  FaUserCircle,
  FaCalculator,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

const StatCard = ({ icon, title, value, color }) => (
  <motion.div
    className={`backdrop-blur-lg bg-white/70 dark:bg-neutral-800/60 p-6 rounded-2xl shadow-xl border border-gray-200/50 dark:border-neutral-700/50 flex items-center gap-4 transition-transform hover:scale-105 ${color}`}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="text-4xl">{icon}</div>
    <div>
      <p className="text-gray-600 dark:text-neutral-400 text-sm font-medium">
        {title}
      </p>
      <p className="text-3xl font-semibold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    myCars: 0,
    totalRequests: 0,
    approvedRequests: 0,
    pendingRequests: 0,
  });
  const [recentCars, setRecentCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {

    const fetchDashboard = async () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      setCurrentUser(user);
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        console.log("try...");
        const [carsRes, requestsRes] = await Promise.all([
          axios.get(`http://localhost:5000/car/user`, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          }),
          axios.get(`http://localhost:5000/scrap-request/user`, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          }),
        ]);



        const userCars = carsRes.data;
        const userRequests = requestsRes.data;
        console.log(userCars, userRequests);

        setStats({
          myCars: userCars.length,
          totalRequests: userRequests.length,
          approvedRequests: userRequests.filter(
            (req) => req.status === "Approved"
          ).length,
          pendingRequests: userRequests.filter(
            (req) => req.status === "Pending"
          ).length,
        });
        setRecentCars(userCars.slice(0, 5));
      } catch (error) {
        toast.error("Failed to fetch dashboard data");
        console.error("Dashboard fetch error:", error);
      }
      setLoading(false);
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-neutral-900 dark:to-neutral-800">
        <p className="text-xl text-gray-600 dark:text-neutral-300 animate-pulse">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Welcome, {currentUser?.name || "User"} 👋
          </h1>
          <p className="text-gray-600 dark:text-neutral-400 mt-2">
            Here’s an overview of your car scrap activities.
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            icon={<FaCar className="text-blue-600" />}
            title="My Cars"
            value={stats.myCars}
            color="border-blue-400"
          />
          <StatCard
            icon={<FaWrench className="text-yellow-500" />}
            title="Total Requests"
            value={stats.totalRequests}
            color="border-yellow-400"
          />
          <StatCard
            icon={<FaCheckCircle className="text-green-500" />}
            title="Approved"
            value={stats.approvedRequests}
            color="border-green-400"
          />
          <StatCard
            icon={<FaClock className="text-red-500" />}
            title="Pending"
            value={stats.pendingRequests}
            color="border-red-400"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Cars Table */}
          <motion.div
            className="lg:col-span-2 bg-white/70 dark:bg-neutral-800/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-gray-200/50 dark:border-neutral-700/50"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              My Recent Cars
            </h2>
            <div className="overflow-x-auto">
              {recentCars.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-gray-500 dark:text-neutral-400 border-b border-gray-200 dark:border-neutral-700">
                      <th className="py-3 px-2">Brand</th>
                      <th className="py-3 px-2">Model</th>
                      <th className="py-3 px-2">Year</th>
                      <th className="py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCars.map((car) => (
                      <tr
                        key={car._id}
                        className="border-b border-gray-100 dark:border-neutral-700 hover:bg-blue-50/40 dark:hover:bg-neutral-700/40 transition"
                      >
                        <td className="py-3 px-2 font-medium text-gray-800 dark:text-neutral-200">
                          {car.brand}
                        </td>
                        <td className="py-3 px-2 text-gray-600 dark:text-neutral-400">
                          {car.model}
                        </td>
                        <td className="py-3 px-2 text-gray-600 dark:text-neutral-400">
                          {car.year}
                        </td>
                        <td className="py-3 px-2">
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 dark:text-neutral-400">
                  No cars added yet.
                </p>
              )}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="bg-white/70 dark:bg-neutral-800/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-gray-200/50 dark:border-neutral-700/50"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="flex flex-col gap-4">
              <Link
                href="/user/add-car"
                className="flex items-center gap-3 p-4 rounded-xl bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/50 dark:hover:bg-blue-800 transition shadow-sm"
              >
                <FaCar className="text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-blue-900 dark:text-blue-200">
                  Add New Car
                </span>
              </Link>
              <Link
                href="/user/price-calculater"
                className="flex items-center gap-3 p-4 rounded-xl bg-green-100 hover:bg-green-200 dark:bg-green-900/50 dark:hover:bg-green-800 transition shadow-sm"
              >
                <FaCalculator className="text-green-600 dark:text-green-400" />
                <span className="font-semibold text-green-900 dark:text-green-200">
                  Calculate Scrap Value
                </span>
              </Link>
              <Link
                href="/user/profile"
                className="flex items-center gap-3 p-4 rounded-xl bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/50 dark:hover:bg-purple-800 transition shadow-sm"
              >
                <FaUserCircle className="text-purple-600 dark:text-purple-400" />
                <span className="font-semibold text-purple-900 dark:text-purple-200">
                  View Profile
                </span>
              </Link>
              
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
