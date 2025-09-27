'use client';
import React from 'react';
import { FaCar, FaUsers, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';

const AdminNavbar = () => {
  return (
    <aside className="h-screen w-64 bg-white dark:bg-neutral-900 shadow-xl flex flex-col justify-between fixed top-0 left-0 z-40 border-r border-gray-200 dark:border-neutral-700">
      <div>
        <div className="flex items-center justify-center h-20 border-b border-gray-200 dark:border-neutral-700">
          <span className="text-2xl font-bold text-blue-600 dark:text-white tracking-wide">Car Scrapper Admin</span>
        </div>
        <nav className="mt-8 flex flex-col gap-2 px-4">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-white hover:bg-blue-100 dark:hover:bg-neutral-800 font-medium transition-colors">
            <FaTachometerAlt className="text-blue-500" />
            Dashboard
          </Link>
          <Link href="/admin/manage-cars" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-white hover:bg-blue-100 dark:hover:bg-neutral-800 font-medium transition-colors">
            <FaCar className="text-blue-500" />
            Manage Cars
          </Link>
          <Link href="/admin/manage-user" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-white hover:bg-blue-100 dark:hover:bg-neutral-800 font-medium transition-colors">
            <FaUsers className="text-blue-500" />
            Manage Users
          </Link>
        </nav>
      </div>
      <div className="mb-8 px-4">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-neutral-800 font-medium transition-colors"
          onClick={() => {
            localStorage.removeItem('adminToken');
            window.location.href = '/admin-login';
          }}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminNavbar;