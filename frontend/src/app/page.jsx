'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Importing icons from the react-icons library
import { FaCar, FaSearch, FaRegChartBar, FaWrench } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Home = () => {
  // State to hold the user's search query
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, you would handle the search logic here
    // e.g., navigate to a search results page
    if (query.trim()) {
      alert(`Searching for: ${query}`);
    }
  };

  const features = [
    {
      icon: <FaCar className="text-4xl text-blue-500" />,
      title: 'Comprehensive Scraping',
      description: 'Pull detailed car data from multiple sources across the web in real-time.',
    },
    {
      icon: <FaRegChartBar className="text-4xl text-blue-500" />,
      title: 'In-Depth Comparison',
      description: 'Easily compare specs, prices, and features of different models side-by-side.',
    },
    {
      icon: <FaWrench className="text-4xl text-blue-500" />,
      title: 'Powerful Management',
      description: 'Organize, filter, and manage your scraped car data in a personal dashboard.',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-[#F9FAFB] text-[#6B7280] overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center text-center px-4 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center scale-110 brightness-100" style={{ backgroundImage: "url('https://www.pensamentoverde.com.br/wp-content/uploads/2018/02/img114-4.jpg')" }}></div>
          <div className="absolute inset-0 bg-[#1A2E40] opacity-60"></div>
          <div className="relative z-10 flex flex-col items-center w-full">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-2xl tracking-tight text-white">
              The Smartest Way to Find Your Next Car
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8 drop-shadow-lg text-white">
              ScrapHub provides powerful tools to find, compare, and manage vehicle data instantly.
            </p>
            <form
              onSubmit={handleSearch}
              className="w-full max-w-xl bg-white rounded-full shadow-2xl flex items-center p-2 border-2 border-[#4B5563] focus-within:ring-2 focus-within:ring-[#F97316]"
            >
              <FaSearch className="text-[#1A2E40] mx-4" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter a car model, e.g., 'Toyota Camry'..."
                className="w-full bg-transparent border-none focus:outline-none text-[#111827] placeholder-[#6B7280] text-base md:text-lg"
              />
              <button
                type="submit"
                className="bg-[#F97316] text-white font-bold rounded-full px-6 py-3 ml-2 hover:bg-[#EA580C] transition-colors duration-300 shadow-md"
              >
                Search
              </button>
            </form>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto py-16 md:py-24 px-4 sm:px-6 text-center bg-[#E5E7EB] rounded-3xl shadow-2xl my-12 border border-[#4B5563]">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 text-[#111827] drop-shadow-lg tracking-tight">Why Choose <span className="text-[#F97316]">ScrapHub</span>?</h2>
          <p className="text-lg text-[#6B7280] mb-12 max-w-3xl mx-auto">
            We provide a suite of features designed to give you the most comprehensive and user-friendly car data experience.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2, type: 'spring', stiffness: 40 }}
                whileHover={{ scale: 1.08, boxShadow: "0 8px 32px 0 rgba(249,115,22,0.15)" }}
                className="p-8 rounded-2xl shadow-xl border-2 transition-all duration-100 bg-white border-[#4B5563]"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-[#111827] drop-shadow">{feature.title}</h3>
                <p className="text-[#10B981]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-[#F9FAFB] py-16 md:py-24 px-4 sm:px-6">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-12 text-[#111827] drop-shadow-lg tracking-tight">Get Started in 3 Easy Steps</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
              <motion.div whileHover={{ scale: 1.1 }} className="flex items-center flex-col md:flex-row gap-4">
                <div className="bg-[#F97316] text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">1</div>
                <p className="text-lg text-[#10B981]">Enter a Car Model</p>
              </motion.div>
              <div className="text-2xl text-[#F97316] hidden md:block">&rarr;</div>
              <motion.div whileHover={{ scale: 1.1 }} className="flex items-center flex-col md:flex-row gap-4">
                <div className="bg-[#F97316] text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">2</div>
                <p className="text-lg text-[#10B981]">Browse Scraped Results</p>
              </motion.div>
              <div className="text-2xl text-[#F97316] hidden md:block">&rarr;</div>
              <motion.div whileHover={{ scale: 1.1 }} className="flex items-center flex-col md:flex-row gap-4">
                <div className="bg-[#F97316] text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">3</div>
                <p className="text-lg text-[#10B981]">Compare and Decide</p>
              </motion.div>
            </div>
          </div>
        </section>
        <Footer />

      </main>
    </>
  );
};

export default Home;