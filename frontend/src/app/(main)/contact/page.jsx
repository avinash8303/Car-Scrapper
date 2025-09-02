import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-800 to-gray-900 py-10">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-2xl dark:bg-neutral-900 dark:border-neutral-700 p-8 sm:p-10">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
            Contact Us
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
            We'd love to hear from you! Reach out to us anytime.
          </p>
        </div>
        <ul className="space-y-4 text-gray-700 dark:text-neutral-300">
          <li className="flex items-center">
            <span className="font-medium">Email:</span>
            <a
              href="mailto:avinashtripathi826@gmail.com"
              className="ml-2 text-blue-600 hover:underline dark:text-blue-400"
            >
              avinashtripathi826@gmail.com
            </a>
          </li>
          <li className="flex items-center">
            <span className="font-medium">Made by:</span>
            <span className="ml-2">❤️ Avinash Tripathi</span>
          </li>
          <li className="flex items-center">
            <span className="font-medium">Mobile:</span>
            <a
              href="tel:+918303892836"
              className="ml-2 text-blue-600 hover:underline dark:text-blue-400"
            >
              +91 8303892836
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;