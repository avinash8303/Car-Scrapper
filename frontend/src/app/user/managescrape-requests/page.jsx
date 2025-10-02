"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';

const ManageScrapRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);


    const fetchRequests = async (userId) => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/scrap-request/user`, {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`
                }
            });
            // Assuming the backend populates car and user (vendor) details
            setRequests(res.data);
        } catch (error) {
            toast.error("Failed to fetch scrap requests.");
            console.error("Fetch requests error:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (currentUser) {
            fetchRequests(currentUser._id);
        }
    }, [currentUser]);

    const handleUpdateRequest = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/scrap-request/${id}`, { status });
            toast.success(`Request has been ${status.toLowerCase()}.`);
            // Refresh the list to show the updated status
            setRequests(prevRequests =>
                prevRequests.map(req =>
                    req._id === id ? { ...req, status } : req
                )
            );
        } catch (error) {
            toast.error("Failed to update the request status.");
            console.error("Update request error:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <FaSpinner className="animate-spin text-4xl text-blue-500" />
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-neutral-950 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Manage Scrap Requests</h1>

            <div className="space-y-5">
                {requests.length > 0 ? (
                    requests.map((req, index) => (
                        <motion.div
                            key={req._id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-neutral-800 p-5 rounded-xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                            <div className="flex items-center gap-4">
                                <img src={req.car?.image || 'https://via.placeholder.com/150'} alt="Car" className="w-24 h-16 object-cover rounded-lg" />
                                <div>
                                    <p className="font-bold text-lg text-gray-800 dark:text-white">{req.car?.brand} {req.car?.model} ({req.car?.year})</p>
                                    <p className="text-sm text-gray-500 dark:text-neutral-400">
                                        Requested by: <span className="font-medium">{req.user?.name || 'A Vendor'}</span>
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-neutral-300 mt-1">
                                        Reason: {req.reason || 'Not specified'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 self-end sm:self-center">
                                {req.status === 'Pending' ? (
                                    <>
                                        <button
                                            onClick={() => handleUpdateRequest(req._id, 'Approved')}
                                            className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
                                            title="Approve"
                                        >
                                            <FaCheck />
                                        </button>
                                        <button
                                            onClick={() => handleUpdateRequest(req._id, 'Rejected')}
                                            className="flex items-center justify-center w-10 h-10 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                                            title="Reject"
                                        >
                                            <FaTimes />
                                        </button>
                                    </>
                                ) : (
                                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${req.status === 'Approved'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                                            : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                                        }`}>
                                        {req.status}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-16">
                        <p className="text-gray-500 dark:text-neutral-400">You have no incoming scrap requests.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageScrapRequests;