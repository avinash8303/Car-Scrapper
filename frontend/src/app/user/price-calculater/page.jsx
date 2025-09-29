"use client";
import { useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaCalculator, FaSpinner, FaCar, FaTachometerAlt, FaCalendarAlt, FaCogs, FaBars, FaTimes } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

const formControlVariants = {
  hover: { scale: 1.02 },
  tap: { scale: 0.98 }
};

const Sidebar = ({ isOpen, setIsOpen }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-30"
                        onClick={() => setIsOpen(false)}
                    />
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", bounce: 0.3 }}
                        className="fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-neutral-800 shadow-2xl z-40"
                    >
                        <div className="p-5">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Menu</h2>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full"
                                >
                                    <FaTimes className="text-gray-600 dark:text-neutral-400" />
                                </button>
                            </div>
                            <nav className="space-y-4">
                                <a href="/user/dashboard" className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg text-gray-700 dark:text-neutral-300">
                                    <FaCar /> Dashboard
                                </a>
                                <a href="/user/price-calculator" className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                    <FaCalculator /> Price Calculator
                                </a>
                                {/* Add more navigation items here */}
                            </nav>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const PriceCalculator = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({
        brand: "",
        model: "",
        year: "",
        mileage: "",
        condition: "Good",
    });
    const [price, setPrice] = useState(null);
    const [explanation, setExplanation] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const aiResponse = await axios.post('http://localhost:5000/ai/generate', {
                brand: form.brand,
                model: form.model,
                year: form.year,
                mileage: form.mileage,
                condition: form.condition 
            });

            if (aiResponse.data && aiResponse.data.text) {
                // Look for JSON object in the response text
                const jsonMatch = aiResponse.data.text.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const jsonData = JSON.parse(jsonMatch[0]);
                    // Extract price from JSON
                    if (jsonData.price) {
                        setPrice(jsonData.price);
                        setExplanation(aiResponse.data.text);
                        toast.success('Price calculated successfully!');
                    } else {
                        throw new Error('No price found in response');
                    }
                } else {
                    throw new Error('No valid JSON found in response');
                }
            } else {
                throw new Error('Invalid response from AI');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to calculate price');
            console.error('AI Calculation error:', error);
            setPrice(null);
            setExplanation('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-neutral-950 dark:to-neutral-900 p-6"
        >
            {/* Sidebar Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed top-6 left-6 z-50 p-3 bg-white dark:bg-neutral-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
                <FaBars className="text-gray-600 dark:text-neutral-400" />
            </motion.button>

            {/* Sidebar Component */}
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="max-w-5xl mx-auto">
                <motion.h1 
                    variants={itemVariants}
                    className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                        Scrap Value Calculator
                    </span>
                </motion.h1>

                <motion.div
                    variants={itemVariants}
                    className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div 
                            variants={containerVariants}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            <motion.div 
                                variants={itemVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="space-y-2"
                            >
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-neutral-300">
                                    <FaCar className="text-blue-500" />
                                    Brand
                                </label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={form.brand}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-800/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter car brand"
                                />
                            </motion.div>
                            <motion.div 
                                variants={itemVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="space-y-2"
                            >
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-neutral-300">
                                    <FaCogs className="text-blue-500" />
                                    Model
                                </label>
                                <input
                                    type="text"
                                    name="model"
                                    value={form.model}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-800/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter car model"
                                />
                            </motion.div>
                            <motion.div 
                                variants={itemVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="space-y-2"
                            >
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-neutral-300">
                                    <FaCalendarAlt className="text-blue-500" />
                                    Year
                                </label>
                                <input
                                    type="number"
                                    name="year"
                                    value={form.year}
                                    onChange={handleChange}
                                    required
                                    min="1900"
                                    max={new Date().getFullYear()}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-800/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter year"
                                />
                            </motion.div>
                            <motion.div 
                                variants={itemVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="space-y-2"
                            >
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-neutral-300">
                                    <FaTachometerAlt className="text-blue-500" />
                                    Mileage (km)
                                </label>
                                <input
                                    type="number"
                                    name="mileage"
                                    value={form.mileage}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-800/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter mileage"
                                />
                            </motion.div>
                        </motion.div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-neutral-300">
                                Condition
                            </label>
                            <select
                                name="condition"
                                value={form.condition}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-800/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                            >
                                <option value="Excellent">Excellent</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                                <option value="Poor">Poor</option>
                            </select>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <FaSpinner className="animate-spin text-xl" />
                            ) : (
                                <FaCalculator className="text-xl" />
                            )}
                            {loading ? 'Calculating...' : 'Calculate Scrap Value'}
                        </motion.button>
                    </form>

                    <AnimatePresence>
                        {price && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="mt-8 p-6 bg-blue-50 dark:bg-neutral-700/50 rounded-xl border border-blue-100 dark:border-neutral-600"
                            >
                                <motion.h2 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-3"
                                >
                                    Estimated Scrap Value: 
                                    <motion.span
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-blue-600 dark:text-blue-400 ml-2"
                                    >
                                        ₹{price.toLocaleString()}
                                    </motion.span>
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="text-gray-700 dark:text-neutral-300 text-sm leading-relaxed whitespace-pre-line"
                                >
                                   
                                </motion.p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default PriceCalculator;
