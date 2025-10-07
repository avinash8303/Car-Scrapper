"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaTimes, FaImage, FaFilter, FaBroom, FaWrench } from 'react-icons/fa';

const ListCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalImg, setModalImg] = useState(null);
    const [editCar, setEditCar] = useState(null);
    const [editLoading, setEditLoading] = useState(false);
    const [filters, setFilters] = useState({ brand: "", model: "", year: "" });

    const fetchCars = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/car/getall');
            console.log(res.data);
            
            setCars(res.data);
        } catch (error) {
            toast.error("Failed to fetch cars.");
            console.error("Fetch cars error:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this car?")) {
            try {
                await axios.delete(`http://localhost:5000/car/delete/${id}`);
                toast.success("Car deleted successfully!");
                fetchCars(); // Refresh the list
            } catch (error) {
                toast.error("Failed to delete car.");
            }
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setEditLoading(true);
        try {
            await axios.put(`http://localhost:5000/car/update/${editCar._id}`, editCar);
            toast.success("Car updated successfully!");
            setEditCar(null);
            fetchCars();
        } catch (error) {
            toast.error("Failed to update car.");
        }
        setEditLoading(false);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };
    
    const clearFilters = () => {
        setFilters({ brand: "", model: "", year: "" });
    };

    const brands = Array.from(new Set(cars.map(car => car.brand))).sort();
    const models = Array.from(new Set(cars.map(car => car.model))).sort();
    const years = Array.from(new Set(cars.map(car => car.year))).sort((a, b) => b - a);

    const filteredCars = cars.filter(car => {
        return (
            (filters.brand ? car.brand === filters.brand : true) &&
            (filters.model ? car.model === filters.model : true) &&
            (filters.year ? car.year.toString() === filters.year : true)
        );
    });

    const handleScrapRequest = async (carId) => {
        const reason = prompt("Please provide a reason for the scrap request:");
        if (reason) {
            try {
                await axios.post('http://localhost:5000/scrap-request', 
                    { car: carId, reason },
                    { headers: { 'x-auth-token': sessionStorage.getItem('vendor-token') } } // Or however you manage auth
                );
                toast.success("Scrap request sent successfully!");
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to send scrap request.");
            }
        }
    };

    if (loading) {
        return <div className="text-center p-10">Loading car list...</div>;
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-neutral-900 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Manage Car Listings</h1>

            {/* Filter Section */}
            <div className="mb-6 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
                    <div className="md:col-span-4 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">Brand</label>
                        <select name="brand" value={filters.brand} onChange={handleFilterChange} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-neutral-700 dark:border-neutral-600">
                            <option value="">All Brands</option>
                            {brands.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">Model</label>
                        <select name="model" value={filters.model} onChange={handleFilterChange} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-neutral-700 dark:border-neutral-600">
                            <option value="">All Models</option>
                            {models.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">Year</label>
                        <select name="year" value={filters.year} onChange={handleFilterChange} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-neutral-700 dark:border-neutral-600">
                            <option value="">All Years</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>
                    <button onClick={clearFilters} className="flex items-center justify-center gap-2 bg-gray-200 dark:bg-neutral-600 hover:bg-gray-300 dark:hover:bg-neutral-500 text-black dark:text-white font-bold py-2 px-4 rounded-md h-10">
                        <FaBroom /> Clear
                    </button>
                </div>
            </div>

            {/* Cars Table */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 dark:bg-neutral-900">
                            <tr className="text-gray-600 dark:text-neutral-300">
                                <th className="p-4">Image</th>
                                <th className="p-4">Brand</th>
                                <th className="p-4">Model</th>
                                <th className="p-4">Year</th>
                                <th className="p-4">Reg. Number</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCars.map((car) => (
                                <motion.tr key={car._id} layout className="border-t dark:border-neutral-700">
                                    <td className="p-4">
                                        <img src={car.image} alt={`${car.brand} ${car.model}`} className="w-16 h-10 object-cover rounded-md cursor-pointer" onClick={() => setModalImg(car.image)} />
                                    </td>
                                    <td className="p-4 font-medium text-gray-800 dark:text-white">{car.brand}</td>
                                    <td className="p-4 text-gray-600 dark:text-neutral-300">{car.model}</td>
                                    <td className="p-4 text-gray-600 dark:text-neutral-300">{car.year}</td>
                                    <td className="p-4 text-gray-600 dark:text-neutral-300">{car.regNumber}</td>
                                    <td className="p-4">
                                        <div className="flex gap-3">
                                            <button onClick={() => setEditCar(car)} className="text-blue-500 hover:text-blue-700" title="Edit"><FaEdit size={18} /></button>
                                            <button onClick={() => handleDelete(car._id)} className="text-red-500 hover:text-red-700" title="Delete"><FaTrash size={18} /></button>
                                            {/* <button onClick={() => handleScrapRequest(car._id)} className="text-yellow-500 hover:text-yellow-700" title="Request Scrap"><FaWrench size={18} /></button> */}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Image Modal */}
            <AnimatePresence>
                {modalImg && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={() => setModalImg(null)}>
                        <motion.img initial={{ scale: 0.5 }} animate={{ scale: 1 }} src={modalImg} alt="Enlarged car" className="max-w-3xl max-h-[80vh] rounded-lg" />
                        <button className="absolute top-4 right-4 text-white"><FaTimes size={24} /></button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Edit Modal */}
            <AnimatePresence>
                {editCar && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                        <motion.div initial={{ y: -50 }} animate={{ y: 0 }} className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-xl w-full max-w-md">
                            <h2 className="text-2xl font-bold mb-6 dark:text-white">Edit Car</h2>
                            <form onSubmit={handleEditSubmit}>
                                {/* Form fields for brand, model, year, etc. */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">Brand</label>
                                    <input type="text" value={editCar.brand} onChange={(e) => setEditCar({ ...editCar, brand: e.target.value })} className="mt-1 p-2 w-full border rounded-md dark:bg-neutral-700 dark:border-neutral-600" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">Model</label>
                                    <input type="text" value={editCar.model} onChange={(e) => setEditCar({ ...editCar, model: e.target.value })} className="mt-1 p-2 w-full border rounded-md dark:bg-neutral-700 dark:border-neutral-600" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">Year</label>
                                    <input type="number" value={editCar.year} onChange={(e) => setEditCar({ ...editCar, year: e.target.value })} className="mt-1 p-2 w-full border rounded-md dark:bg-neutral-700 dark:border-neutral-600" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">Registration Number</label>
                                    <input type="text" value={editCar.regNumber} onChange={(e) => setEditCar({ ...editCar, regNumber: e.target.value })} className="mt-1 p-2 w-full border rounded-md dark:bg-neutral-700 dark:border-neutral-600" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">Chassis Number</label>
                                    <input type="text" value={editCar.chassisNumber} onChange={(e) => setEditCar({ ...editCar, chassisNumber: e.target.value })} className="mt-1 p-2 w-full border rounded-md dark:bg-neutral-700 dark:border-neutral-600" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">Car Image</label>
                                    <div className="flex items-center gap-4">
                                        {editCar.image && (
                                            <img src={editCar.image} alt="Car" className="w-32 h-20 object-cover rounded-md" />
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setEditCar({ ...editCar, newImageFile: e.target.files[0] })}
                                            className="mt-1 p-2 w-full border rounded-md dark:bg-neutral-700 dark:border-neutral-600"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4 mt-6">
                                    <button type="button" onClick={() => setEditCar(null)} className="py-2 px-4 bg-gray-200 dark:bg-neutral-600 rounded-md">Cancel</button>
                                    <button type="submit" disabled={editLoading} className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300">{editLoading ? 'Saving...' : 'Save Changes'}</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ListCars;