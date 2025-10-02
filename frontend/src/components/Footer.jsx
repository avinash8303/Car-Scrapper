import React from 'react';
import { motion } from 'framer-motion';
// Importing icons from the react-icons library
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {

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
    )
}

export default Footer