'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/car/getbyid/${id}`);
        setCar(res.data);
      } catch (err) {
        setError('Failed to fetch car details');
      }
      setLoading(false);
    };
    if (id) fetchCar();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-white">Loading...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-red-500">{error}</div>;
  }
  if (!car) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-gray-400">Car not found.</div>;
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-2xl w-full mx-auto bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-8 flex flex-col gap-4 items-center">
        {car.image && (
          <button
            className="bg-blue-100 dark:bg-neutral-800 rounded-lg p-1 hover:scale-105 transition-transform mb-4"
            title="View Image"
            onClick={() => window.open(car.image, '_blank')}
          >
            <img src={car.image} alt={car.model} className="w-full h-64 object-cover rounded-lg" />
          </button>
        )}
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2 text-center">{car.brand} {car.model}</h2>
        <div className="w-full">
          <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 rounded-xl shadow-md">
            <tbody className="text-gray-700 dark:text-neutral-300 text-lg">
              <tr>
                <th className="py-2 px-4 font-semibold border-b dark:border-neutral-700"> ID</th>
                <td className="py-2 px-4 border-b dark:border-neutral-700">{car._id}</td>
              </tr>
              <tr>
                <th className="py-2 px-4 font-semibold border-b dark:border-neutral-700">Brand</th>
                <td className="py-2 px-4 border-b dark:border-neutral-700">{car.brand}</td>
              </tr>
              <tr>
                <th className="py-2 px-4 font-semibold border-b dark:border-neutral-700">Model</th>
                <td className="py-2 px-4 border-b dark:border-neutral-700">{car.model}</td>
              </tr>
              <tr>
                <th className="py-2 px-4 font-semibold border-b dark:border-neutral-700">Year</th>
                <td className="py-2 px-4 border-b dark:border-neutral-700">{car.year}</td>
              </tr>
              <tr>
                <th className="py-2 px-4 font-semibold border-b dark:border-neutral-700">Registration Number</th>
                <td className="py-2 px-4 border-b dark:border-neutral-700">{car.regNumber}</td>
              </tr>
              <tr>
                <th className="py-2 px-4 font-semibold border-b dark:border-neutral-700">Chassis Number</th>
                <td className="py-2 px-4 border-b dark:border-neutral-700">{car.chassisNumber}</td>
              </tr>
              <tr>
                <th className="py-2 px-4 font-semibold border-b dark:border-neutral-700">Created</th>
                <td className="py-2 px-4 border-b dark:border-neutral-700">{car.createdAt ? new Date(car.createdAt).toLocaleDateString() : 'N/A'}</td>
              </tr>
              {car.image && (
                <tr>
                  <th className="py-2 px-4 font-semibold">Image URL</th>
                  <td className="py-2 px-4"><a href={car.image} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View Image</a></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default CarDetails;