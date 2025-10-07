import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-[#1a2e40] text-white text-sm py-3 dark:bg-neutral-800">
            <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
                <a
                    className="flex-none font-semibold text-xl  focus:outline-hidden focus:opacity-80 dark:text-white"
                    href="/"
                    aria-label="Brand"
                >
                    ScrapHub
                </a>
                <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
                    <Link
                        className="font-medium  hover:text-gray-400 focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                        href="/"
                    >
                        Home
                    </Link>
                    <Link
                        className="font-medium  hover:text-gray-400 focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                        href="/vendor/dashboard"
                    >
                        Vendor Dashboard 
                    </Link>
                    <a
                        className="font-medium  hover:text-gray-400 focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                        href="/contact"
                    >
                        Contact Us
                    </a>
                    <a
                        className="font-medium  hover:text-gray-400 focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                        href="/login"
                    >
                        Login
                    </a>
                    {/* Vendor Dropdown Section */}
                    <div className="relative group">
                        <button
                            className="font-medium  hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 px-3 py-2 focus:outline-none flex items-center gap-1"
                        >
                            Vendor
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        <div className="absolute left-0 mt-2 w-40 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-gray-200 dark:border-neutral-700 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-10">
                            <a
                                href="/vendor-login"
                                className="block px-4 py-2 text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-t-lg"
                            >
                                Vendor Login
                            </a>
                            <a
                                href="/vendor-signup"
                                className="block px-4 py-2 text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-b-lg"
                            >
                                Vendor Signup
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar