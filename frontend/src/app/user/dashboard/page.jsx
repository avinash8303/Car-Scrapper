"use client";
import React, { useEffect, useState } from 'react';
import { FaCar, FaWrench, FaCheckCircle, FaClock, FaUserCircle, FaCalculator } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';

const StatCard = ({ icon, title, value, color }) => (
  <motion.div
    className={`bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg flex items-center gap-4 border-l-4 ${color}`}
    whileHover={{ scale: 1.05 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <div className="text-3xl">{icon}</div>
    <div>
      <p className="text-gray-500 dark:text-neutral-400 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
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
    const user = JSON.parse(sessionStorage.getItem('user'));
    setCurrentUser(user);
  }, []);

  const fetchData = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const [carsRes, requestsRes] = await Promise.all([
        axios.get(`http://localhost:5000/car/user/${currentUser._id}`),
        axios.get(`http://localhost:5000/scrap-request/user/${currentUser._id}`)
      ]);

      const userCars = carsRes.data;
      const userRequests = requestsRes.data;

      setStats({
        myCars: userCars.length,
        totalRequests: userRequests.length,
        approvedRequests: userRequests.filter(req => req.status === 'Approved').length,
        pendingRequests: userRequests.filter(req => req.status === 'Pending').length,
      });

      setRecentCars(userCars.slice(0, 5));

    } catch (error) {
      toast.error("Failed to fetch dashboard data");
      console.error("Dashboard fetch error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
        <p className="text-xl text-gray-600 dark:text-neutral-400">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div   
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome, {currentUser?.name || 'User'}!</h1>
          <p className="text-gray-600 dark:text-neutral-400 mb-8">Manage your cars and scrap requests here.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
        >
          <StatCard icon={<FaCar className="text-blue-500" />} title="My Cars" value={stats.myCars} color="border-blue-500" />
          <StatCard icon={<FaWrench className="text-yellow-500" />} title="Total Requests" value={stats.totalRequests} color="border-yellow-500" />
          <StatCard icon={<FaCheckCircle className="text-green-500" />} title="Approved Requests" value={stats.approvedRequests} color="border-green-500" />
          <StatCard icon={<FaClock className="text-red-500" />} title="Pending Requests" value={stats.pendingRequests} color="border-red-500" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Cars */}
          <motion.div
            className="lg:col-span-2 bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">My Recent Cars</h2>
            <div className="overflow-x-auto">
              {recentCars.length > 0 ? (
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-500 dark:text-neutral-400 border-b dark:border-neutral-700">
                      <th className="py-2">Brand</th>
                      <th className="py-2">Model</th>
                      <th className="py-2">Year</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCars.map(car => (
                      <tr key={car._id} className="border-b dark:border-neutral-700 last:border-none">
                        <td className="py-3 font-medium text-gray-700 dark:text-neutral-300">{car.brand}</td>
                        <td className="py-3 text-gray-600 dark:text-neutral-400">{car.model}</td>
                        <td className="py-3 text-gray-600 dark:text-neutral-400">{car.year}</td>
                        <td className="py-3">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 dark:text-neutral-400">No cars listed yet.</p>
              )}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-4">
              <Link href="/user/add-car" className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/50 dark:hover:bg-blue-900 transition">
                <FaCar className="text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-blue-800 dark:text-blue-200">Add New Car</span>
              </Link>
              <Link href="/user/price-calculater" className="flex items-center gap-3 p-4 rounded-lg bg-green-50 hover:bg-green-100 dark:bg-green-900/50 dark:hover:bg-green-900 transition">
                <FaCalculator className="text-green-600 dark:text-green-400" />
                <span className="font-semibold text-green-800 dark:text-green-200">Calculate Scrap Value</span>
              </Link>
              <Link href="/user/managescrape-requests" className="flex items-center gap-3 p-4 rounded-lg bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-900/50 dark:hover:bg-yellow-900 transition">
                <FaWrench className="text-yellow-600 dark:text-yellow-400" />
                <span className="font-semibold text-yellow-800 dark:text-yellow-200">Manage Scrap Requests</span>
              </Link>
              <Link href="/user/profile" className="flex items-center gap-3 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/50 dark:hover:bg-purple-900 transition">
                <FaUserCircle className="text-purple-600 dark:text-purple-400" />
                <span className="font-semibold text-purple-800 dark:text-purple-200">View Profile</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;