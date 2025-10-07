"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaCar, FaUsers, FaTools, FaCheckCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Link from 'next/link';

const StatCard = ({ title, value, icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg flex items-center gap-4 border-l-4 ${color}`}
  >
    <div className={`text-3xl ${color.replace('border', 'text')}`}>{icon}</div>
    <div>
      <p className="text-gray-500 dark:text-neutral-400 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCars: 0,
    totalUsers: 0,
    pendingRequests: 0,
    approvedRequests: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [cars, users, requests] = await Promise.all([
          axios.get('http://localhost:5000/car/getall'),
          axios.get('http://localhost:5000/user/getall'),
          axios.get('http://localhost:5000/scrap-request')
        ]);

        setStats({
          totalCars: cars.data.length,
          totalUsers: users.data.length,
          pendingRequests: requests.data.filter(req => req.status === 'Pending').length,
          approvedRequests: requests.data.filter(req => req.status === 'Approved').length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
      >
        Admin Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Cars"
          value={stats.totalCars}
          icon={<FaCar />}
          color="border-blue-500"
        />
        <StatCard 
          title="Total Users"
          value={stats.totalUsers}
          icon={<FaUsers />}
          color="border-green-500"
        />
        <StatCard 
          title="Pending Requests"
          value={stats.pendingRequests}
          icon={<FaTools />}
          color="border-yellow-500"
        />
        <StatCard 
          title="Approved Requests"
          value={stats.approvedRequests}
          icon={<FaCheckCircle />}
          color="border-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          {/* Add your recent activity list here */}
        </motion.div>

        {/* Quick Actions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href={'/admin/manage-cars'} className="w-full block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
              View All Cars
            </Link>
            <Link href={'/admin/manage-user'} className="w-full block bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors">
              Manage Users
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;