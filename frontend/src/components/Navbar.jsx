import React from 'react'

const Navbar = () => {
    return (
        <header className="w-full bg-[#1A2E40] text-white shadow-md">
            <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between py-4">
                <a
                    className="font-bold text-2xl text-[#F97316] tracking-wide"
                    href="/"
                    aria-label="Brand"
                >
                    ScrapHub
                </a>
                <div className="flex items-center gap-8">
                    <a className="font-medium text-white hover:text-[#F97316] transition-colors" href="/">Home</a>
                    <a className="font-medium text-white hover:text-[#F97316] transition-colors" href="/about">About Us</a>
                    <a className="font-medium text-white hover:text-[#F97316] transition-colors" href="/contact">Contact Us</a>
                    <a className="font-medium text-white hover:text-[#F97316] transition-colors" href="/login">Login</a>
                    <div className="relative group">
                        <button className="font-medium text-white hover:text-[#F97316] px-3 py-2 focus:outline-none flex items-center gap-1">
                            Vendor
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        <div className="absolute left-0 mt-2 w-40 bg-[#1A2E40] rounded-lg shadow-lg border border-[#4B5563] opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-10">
                            <a
                                href="/vendor-login"
                                className="block px-4 py-2 text-white hover:bg-[#F97316] rounded-t-lg"
                            >
                                Vendor Login
                            </a>
                            <a
                                href="/vendor-signup"
                                className="block px-4 py-2 text-white hover:bg-[#F97316] rounded-b-lg"
                            >
                                Vendor Signup
                            </a>
                        </div>
                    </div>
                    <a href="/user/price-calculater" className="bg-[#F97316] text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-[#EA580C] transition-colors ml-4">Get Car Value</a>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;