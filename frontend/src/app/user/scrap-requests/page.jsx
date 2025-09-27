"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';

const ScrapRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            // Assuming you have an endpoint to get requests for the logged-in user
            const res = await axios.get('http://localhost:5000/scrap-request/user', {
                headers: { 'x-auth-token': sessionStorage.getItem('user-token') } // Or however you manage auth
            });
            setRequests(res.data);
        } catch (error) {
            toast.error("Failed to fetch scrap requests.");
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleUpdateRequest = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/scrap-request/${id}`, { status });
            toast.success(`Request ${status.toLowerCase()}ed!`);
            fetchRequests(); // Refresh list
        } catch (error) {
            toast.error("Failed to update request.");
        }
    };

    if (loading) {
        return <div className="text-center p-10">Loading requests...</div>;
    }

    return (
        <div className="p-8 bg-gray-50 dark:bg-neutral-900 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Incoming Scrap Requests</h1>
            <div className="space-y-4">
                {requests.length > 0 ? requests.map(req => (
                    <motion.div
                        key={req._id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-md flex items-center justify-between"
                    >
                        <div>
                            <p className="font-bold text-lg dark:text-white">{req.car.brand} {req.car.model} ({req.car.year})</p>
                            <p className="text-sm text-gray-500 dark:text-neutral-400">Requested by: {req.user.name} on {new Date(req.requestedAt).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-600 dark:text-neutral-300 mt-1">Reason: {req.reason}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            {req.status === 'Pending' ? (
                                <>
                                    <button onClick={() => handleUpdateRequest(req._id, 'Approved')} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"><FaCheck /></button>
                                    <button onClick={() => handleUpdateRequest(req._id, 'Rejected')} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"><FaTimes /></button>
                                </>
                            ) : (
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    req.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>{req.status}</span>
                            )}
                        </div>
                    </motion.div>
                )) : (
                    <p className="text-center text-gray-500 dark:text-neutral-400">No scrap requests found.</p>
                )}
            </div>
        </div>
    );
};

export default ScrapRequests;