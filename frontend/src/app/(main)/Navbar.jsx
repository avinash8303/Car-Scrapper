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
                    <a className="font-medium text-white hover:text-[#F97316] transition-colors" href="/vendor-login">Vendor Login</a>
                    <a href="/price-calculater" className="bg-[#F97316] text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-[#EA580C] transition-colors ml-4">Get Car Value</a>
                </div>
            </nav>
        </header>
    )
}

export default Navbar