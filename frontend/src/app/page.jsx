'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCar, FaSearch, FaRegChartBar, FaWrench } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Home = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      alert(`Searching for: ${query}`);
    }
  };

  const features = [
    {
      icon: <FaCar className="text-5xl text-[#F97316]" />,
      title: 'Comprehensive Scraping',
      description: 'Pull detailed car data from multiple trusted sources across the web in real-time.',
    },
    {
      icon: <FaRegChartBar className="text-5xl text-[#F97316]" />,
      title: 'In-Depth Comparison',
      description: 'Compare specs, prices, and features of various car models side-by-side effortlessly.',
    },
    {
      icon: <FaWrench className="text-5xl text-[#F97316]" />,
      title: 'Smart Management',
      description: 'Organize, filter, and manage your scraped data seamlessly in your personal dashboard.',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-[#F9FAFB] text-[#374151] overflow-x-hidden">
        {/* 🎥 Hero Section with Background Video */}
        <section className="relative w-full h-[80vh] flex items-center justify-center text-center px-6 overflow-hidden">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover brightness-90 scale-110"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center w-full max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] leading-tight">
              The Smartest Way to Find Your Next Car
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed">
              ScrapHub empowers you to find, compare, and manage vehicle data — all in one place.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="w-full bg-white/95 backdrop-blur-md rounded-full shadow-xl flex items-center p-2 border border-gray-300 hover:shadow-2xl transition-all"
            >
              <FaSearch className="text-gray-600 mx-4 text-lg" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search car models e.g., 'Toyota Camry'..."
                className="w-full bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-500 text-base md:text-lg"
              />
              <button
                type="submit"
                className="bg-[#F97316] text-white font-semibold rounded-full px-6 py-3 ml-2 hover:bg-[#EA580C] transition-all duration-300 shadow-md"
              >
                Search
              </button>
            </form>
          </motion.div>
        </section>

        {/* ⚙️ Features Section */}
        <section className="container mx-auto py-20 px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold mb-6 text-[#111827]"
          >
            Why Choose <span className="text-[#F97316]">ScrapHub</span>?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto"
          >
            We provide innovative features to make car data discovery faster, smarter, and more insightful.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 30px rgba(249,115,22,0.25)',
                }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-8 border border-gray-200"
              >
                <div className="flex justify-center mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 🚗 How It Works Section */}
        <section className="bg-[#F3F4F6] py-20 px-6">
          <div className="container mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-extrabold mb-12 text-[#111827]"
            >
              Get Started in <span className="text-[#F97316]">3 Easy Steps</span>
            </motion.h2>

            <div className="flex flex-col md:flex-row justify-center items-center gap-10">
              {[
                { step: 1, text: 'Enter a Car Model' },
                { step: 2, text: 'Browse Scraped Results' },
                { step: 3, text: 'Compare and Decide' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col md:flex-row items-center gap-4"
                >
                  <div className="bg-[#F97316] text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                    {item.step}
                  </div>
                  <p className="text-lg font-medium text-gray-700">{item.text}</p>
                  {idx < 2 && <div className="hidden md:block text-2xl text-[#F97316] mx-4">&rarr;</div>}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Home;
