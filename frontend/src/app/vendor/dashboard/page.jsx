"use client";
import React, { useEffect, useState } from 'react';
import { FaCar, FaClipboardList, FaCheckCircle, FaClock, FaPlus, FaTasks } from 'react-icons/fa';
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
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    totalCars: 0,
    scrapRequests: 0,
    approvedScraps: 0,
    pendingRequests: 0,
  });
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch cars and scrap requests in parallel
      const [carsRes] = await Promise.all([
        axios.get('http://localhost:5000/car/getall'),
        // axios.get('http://localhost:5000/scraprequest')
      ]);

      const cars = carsRes.data;
      console.log(cars);
      
      // const requests = requestsRes.data;

      // Calculate stats
      // const approvedScraps = requests.filter(req => req.status === 'Approved').length;
      // const pendingRequests = requests.filter(req => req.status === 'Pending').length;

      setStats({
        totalCars: cars.length,
        scrapRequests: 0,
        approvedScraps: 0,
        pendingRequests: 0,
      });

      // Set recent requests (e.g., latest 5)
      setRecentRequests(cars);

    } catch (error) {
      toast.error("Failed to fetch dashboard data.");
      console.error("Dashboard data fetch error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusChip = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };  

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Vendor Dashboard</h1>
          <p className="text-gray-600 dark:text-neutral-400 mb-8">Welcome back! Here's an overview of your activity.</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
        >
          <StatCard icon={<FaCar className="text-blue-500" />} title="Total Cars Listed" value={stats.totalCars} color="border-blue-500" />
          <StatCard icon={<FaClipboardList className="text-yellow-500" />} title="Total Scrap Requests" value={stats.scrapRequests} color="border-yellow-500" />
          <StatCard icon={<FaCheckCircle className="text-green-500" />} title="Approved Scraps" value={stats.approvedScraps} color="border-green-500" />
          <StatCard icon={<FaClock className="text-red-500" />} title="Pending Requests" value={stats.pendingRequests} color="border-red-500" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Scrap Requests Table */}
          <motion.div
            className="lg:col-span-2 bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Scrap Requests</h2>
            <div className="overflow-x-auto">
              {recentRequests.length > 0 ? (
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-500 dark:text-neutral-400 border-b dark:border-neutral-700">
                      <th className="py-2">Car Model</th>
                      <th className="py-2">User</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRequests.map(req => (
                      <tr key={req._id} className="border-b dark:border-neutral-700 last:border-none">
                        <td className="py-3 font-medium text-gray-700 dark:text-neutral-300">{req.brand || 'N/A'} {req.model || 'N/A'}</td>
                        <td className="py-3 text-gray-600 dark:text-neutral-300">{req.owner?.name || 'N/A'}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusChip(req.status)}`}>
                            {req.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 dark:text-neutral-400">No recent scrap requests found.</p>
              )}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-4">
              
              <Link href="/vendor/list-cars" className="flex items-center gap-3 p-4 rounded-lg bg-green-50 hover:bg-green-100 dark:bg-green-900/50 dark:hover:bg-green-900 transition">
                <FaTasks className="text-green-600 dark:text-green-400" />
                <span className="font-semibold text-green-800 dark:text-green-200">Manage Car Listings</span>
              </Link>
              <Link href="/vendor/scrap-requests" className="flex items-center gap-3 p-4 rounded-lg bg-green-50 hover:bg-green-100 dark:bg-green-900/50 dark:hover:bg-green-900 transition">
                <FaTasks className="text-green-600 dark:text-green-400" />
                <span className="font-semibold text-green-800 dark:text-green-200">Manage Scrap Requests</span>
              </Link>
              
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;