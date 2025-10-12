'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaCar,
  FaSearch,
  FaRegChartBar,
  FaWrench,
  FaRecycle,
  FaMoneyBillWave,
  FaShieldAlt,
} from 'react-icons/fa';
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
      icon: <FaCar className="text-5xl text-[#3B82F6]" />,
      title: 'Comprehensive Scraping',
      description: 'Fetch real-time car data from multiple trusted web sources.',
    },
    {
      icon: <FaRegChartBar className="text-5xl text-[#3B82F6]" />,
      title: 'In-Depth Comparison',
      description: 'Compare models side-by-side with clear and detailed insights.',
    },
    {
      icon: <FaWrench className="text-5xl text-[#3B82F6]" />,
      title: 'Data Management',
      description: 'Organize, filter, and save your results with ease in a personal dashboard.',
    },
  ];

  const services = [
    {
      icon: <FaRecycle className="text-5xl text-[#10B981]" />,
      title: 'Car Scrapping Assistance',
      description:
        'We help you scrap your car safely, legally, and with minimal hassle.',
    },
    {
      icon: <FaMoneyBillWave className="text-5xl text-[#10B981]" />,
      title: 'Instant Scrap Value',
      description:
        'Get the most accurate and best scrap value for your car within seconds.',
    },
    {
      icon: <FaShieldAlt className="text-5xl text-[#10B981]" />,
      title: 'Secure Process',
      description:
        'Enjoy verified dealers, transparent deals, and 100% secure transactions.',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-gradient-to-b from-[#F9FAFB] via-[#E5E7EB] to-[#F3F4F6] text-[#374151] overflow-x-hidden">
        {/* 🎥 Hero Section */}
        <section className="relative w-full h-[75vh] flex items-center justify-center text-center px-4 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover brightness-90 scale-105"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-[#111827]/70 backdrop-blur-sm"></div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-3xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tight drop-shadow-2xl"
            >
              Drive Smarter with <span className="text-[#F97316]">ScrapHub</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-lg md:text-xl mb-10 text-gray-200"
            >
              Discover, compare, and get the best scrap value for your car with
              cutting-edge data insights.
            </motion.p>

            {/* Search Bar */}
           
          </div>
        </section>

        {/* ⚙️ Features Section */}
        <section className="container mx-auto py-20 px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-4 text-[#111827]">
            Why Choose <span className="text-[#F97316]">ScrapHub</span>?
          </h2>
          <p className="text-lg text-[#6B7280] mb-14 max-w-2xl mx-auto">
            Our platform is designed to simplify and elevate your car buying and
            scrapping experience.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.2,
                  duration: 0.6,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                }}
                className="p-8 rounded-3xl shadow-lg bg-white/80 backdrop-blur-lg border border-gray-300 hover:shadow-2xl transition-all"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-[#111827]">
                  {feature.title}
                </h3>
                <p className="text-[#6B7280]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 🛠️ Services Section */}
        <section id="services" className="relative bg-gradient-to-r from-[#0F172A] to-[#1E3A8A] py-20 px-6 text-center text-white">
          <div className="container mx-auto">
            <h2 className="text-4xl font-extrabold mb-4">
              Our <span className="text-[#F97316]">Services</span>
            </h2>
            <p className="text-lg text-gray-300 mb-14 max-w-2xl mx-auto">
              Simplify your scrapping journey with our professional and
              transparent services.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                  }}
                  className="p-8 bg-white/10 border border-white/20 rounded-3xl backdrop-blur-md hover:bg-white/20 transition-all shadow-lg"
                >
                  <div className="flex justify-center mb-6">{service.icon}</div>
                  <h3 className="text-2xl font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-300">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 🚗 How It Works Section */}
        <section className="bg-[#F9FAFB] py-20 px-6">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-extrabold mb-12 text-[#111827]">
              Get Started in 3 Simple Steps
            </h2>

            <div className="flex flex-col md:flex-row justify-center items-center gap-10">
              {['Enter a Car Model', 'Browse Results', 'Compare & Decide'].map(
                (step, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center flex-col md:flex-row gap-4"
                  >
                    <div className="bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                      {i + 1}
                    </div>
                    <p className="text-lg text-[#10B981] font-medium">{step}</p>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Home;

