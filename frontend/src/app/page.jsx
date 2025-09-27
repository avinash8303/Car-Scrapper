
'use client';

// Footer dependencies
import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Importing icons from the react-icons library
import { FaCar, FaSearch, FaRegChartBar, FaWrench } from 'react-icons/fa';
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import Navbar from '@/components/Navbar';

// Footer component definition
const Footer = () => {
  // Animation variants for staggering child animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="bg-gray-950 text-gray-300 pt-16 pb-8 px-6 mt-20"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <motion.div variants={itemVariants} className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-3">ScrapHub</h3>
            <p className="text-sm mb-4">
              Your one-stop solution for scraping, comparing, and managing car data. We provide powerful tools to give you an edge in the automotive market.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-blue-500" />
                <a href="mailto:contact@scraphub.com" className="hover:text-blue-400 transition-colors">
                  contact@scraphub.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-blue-500" />
                <a href="tel:+1234567890" className="hover:text-blue-400 transition-colors">
                  +91-9293000001
                </a>
              </li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-blue-400 transition-colors">Features</a></li>
              <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex gap-2 text-2xl">
              <a href="#" aria-label="Facebook" className="hover:text-blue-400 hover:scale-110 transform transition-all"><FaFacebook /></a>
              <a href="#" aria-label="Instagram" className="hover:text-blue-400 hover:scale-110 transform transition-all"><FaInstagram /></a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-400 hover:scale-110 transform transition-all"><FaTwitter /></a>
            </div>
          </motion.div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} ScrapHub&trade;. All Rights Reserved.
          </p>
          <p className="text-gray-500 mt-1">Designed to empower your automotive decisions.</p>
        </div>
      </div>
    </motion.footer>
  );
};



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
      <main className="relative min-h-screen text-gray-100 overflow-x-hidden">
        {/* Global background gradient and overlay for depth */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-gray-900 to-gray-800" />
          <div className="absolute inset-0 bg-gradient-to-tr from-yellow-200/10 via-blue-400/10 to-transparent" />
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-2xl opacity-40" />
        </div>
        {/* Hero Section */}
        <section className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center text-center text-white px-4 overflow-hidden">
          {/* Background Video or Image */}
          {/* Using a static image for simplicity, but a video would be great here */}
          <div className="absolute inset-0 bg-cover bg-center scale-110  brightness-100" style={{ backgroundImage: "url('https://www.pensamentoverde.com.br/wp-content/uploads/2018/02/img114-4.jpg')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-black/70 to-gray-900/80"></div>

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col items-center w-full">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg tracking-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-yellow-300 bg-clip-text text-transparent animate-pulse">
              The Smartest Way to Find Your Next Car
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8 drop-shadow-lg text-cyan-100">
              ScrapHub provides powerful tools to find, compare, and manage vehicle data instantly.
            </p>

            {/* Interactive Search Bar */}
            <form
              onSubmit={handleSearch}
              className="w-full max-w-xl bg-white/90 rounded-full shadow-2xl flex items-center p-2 border-2 border-blue-400 focus-within:ring-2 focus-within:ring-yellow-300"
            >
              <FaSearch className="text-blue-500 mx-4" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter a car model, e.g., 'Toyota Camry'..."
                className="w-full bg-transparent border-none focus:outline-none text-gray-900 placeholder-gray-500 text-base md:text-lg"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-yellow-400 text-white font-bold rounded-full px-6 py-3 ml-2 hover:from-blue-700 hover:to-yellow-500 transition-colors duration-300 shadow-md"
              >
                Search
              </button>
            </form>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto py-16 md:py-24 px-4 sm:px-6 text-center bg-gradient-to-br from-gray-900 via-blue-950 to-gray-800 rounded-3xl shadow-2xl my-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 text-yellow-300 drop-shadow-lg tracking-tight">Why Choose ScrapHub?</h2>
          <p className="text-lg text-cyan-200 mb-12 max-w-3xl mx-auto">
            We provide a suite of features designed to give you the most comprehensive and user-friendly car data experience.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.07, rotate: -2 }}
                className={
                  `p-8 rounded-2xl shadow-xl border-2 transition-all duration-300 ` +
                  (index === 0 ? 'bg-gradient-to-br from-blue-700 via-blue-900 to-gray-900 border-blue-400' :
                    index === 1 ? 'bg-gradient-to-br from-yellow-500 via-yellow-700 to-gray-900 border-yellow-400' :
                      'bg-gradient-to-br from-cyan-700 via-cyan-900 to-gray-900 border-cyan-400')
                }
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white drop-shadow">{feature.title}</h3>
                <p className="text-cyan-100">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 py-16 md:py-24 px-4 sm:px-6">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-12 text-yellow-300 drop-shadow-lg tracking-tight">Get Started in 3 Easy Steps</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
              <motion.div whileHover={{ scale: 1.1 }} className="flex items-center flex-col md:flex-row gap-4">
                <div className="bg-gradient-to-br from-yellow-400 to-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">1</div>
                <p className="text-lg text-cyan-100">Enter a Car Model</p>
              </motion.div>
              <div className="text-2xl text-yellow-300 hidden md:block">&rarr;</div>
              <motion.div whileHover={{ scale: 1.1 }} className="flex items-center flex-col md:flex-row gap-4">
                <div className="bg-gradient-to-br from-yellow-400 to-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">2</div>
                <p className="text-lg text-cyan-100">Browse Scraped Results</p>
              </motion.div>
              <div className="text-2xl text-yellow-300 hidden md:block">&rarr;</div>
              <motion.div whileHover={{ scale: 1.1 }} className="flex items-center flex-col md:flex-row gap-4">
                <div className="bg-gradient-to-br from-yellow-400 to-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">3</div>
                <p className="text-lg text-cyan-100">Compare and Decide</p>
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