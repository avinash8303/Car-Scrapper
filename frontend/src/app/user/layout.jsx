import React from 'react';
import { FaUser, FaCar, FaCalculator } from 'react-icons/fa';
import Link from 'next/link';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex bg-gradient-to-br from-gray-100 via-blue-50 to-blue-200 dark:from-neutral-900 dark:via-neutral-950 dark:to-black">
            {/* Sidebar */}
            <aside className="w-64 h-screen bg-white dark:bg-neutral-900 shadow-xl flex flex-col justify-between fixed top-0 left-0 z-40 border-r border-gray-200 dark:border-neutral-700">
                <div>
                    <div className="flex items-center justify-center h-20 border-b border-gray-200 dark:border-neutral-700">
                        <span className="text-2xl font-bold text-blue-600 dark:text-white tracking-wide">User</span>
                    </div>
                    <nav className="mt-8 flex flex-col gap-2 px-4">
                        <Link href="/user/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-white hover:bg-blue-100 dark:hover:bg-neutral-800 font-medium transition-colors">
                            <FaUser className="text-blue-500" />
                            Profile
                        </Link>
                        <Link href="/user/add-car" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-white hover:bg-blue-100 dark:hover:bg-neutral-800 font-medium transition-colors">
                            <FaCar className="text-blue-500" />
                            Add Car
                        </Link>
                        <Link href="/user/price-calculater" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-white hover:bg-blue-100 dark:hover:bg-neutral-800 font-medium transition-colors">
                            <FaCalculator className="text-blue-500" />
                            price-calculater
                        </Link>
                    </nav>
                </div>
                <div className="mb-8 px-4 text-center text-xs text-gray-400 dark:text-neutral-500">© 2025 Car Scrapper</div>
            </aside>
            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;