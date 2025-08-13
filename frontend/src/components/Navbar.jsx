import React from 'react'

const Navbar = () => {
    return (
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 dark:bg-neutral-800">
            <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
                <a
                    className="flex-none font-semibold text-xl text-black focus:outline-hidden focus:opacity-80 dark:text-white"
                    href="#"
                    aria-label="Brand"
                >
                    Brand
                </a>
                <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
                    <a
                        className="font-medium text-blue-500 focus:outline-hidden"
                        href="#"
                        aria-current="page"
                    >
                        Landing
                    </a>
                    <a
                        className="font-medium text-gray-600 hover:text-gray-400 focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                        href="#"
                    >
                        Account
                    </a>
                    <a
                        className="font-medium text-gray-600 hover:text-gray-400 focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                        href="#"
                    >
                        Work
                    </a>
                    <a
                        className="font-medium text-gray-600 hover:text-gray-400 focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                        href="#"
                    >
                        Blog
                    </a>
                </div>
            </nav>
        </header>
    )
}

export default Navbar