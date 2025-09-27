'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const VendorDetails = () => {

    const { id } = useParams();
    const [Vendor, setVendor] = useState(null);
    const [Loading, setLoading] = useState(true);
    const [Error, setError] = useState(null);

    useEffect(() => {
        const fetchVendor = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/vendor/getbyid/${id}`);
                setVendor(res.data);
            } catch (error) {
                setError("Failed to fetch vendor");
            }
            setLoading(false);
        };
        fetchVendor();
    }, [id]);

    if(Loading) {
        return <div className="flex items-center justify-center h-64 text-lg font-medium">Loading...</div>;
    }

    if(!Vendor) {
        return <div className="flex items-center justify-center h-64 text-gray-500 text-lg font-medium">No vendor found</div>;
    }

    return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-neutral-900 shadow-md rounded-xl p-6 mt-10">
      <h1 className="text-3xl font-semibold text-center mb-6">{Vendor.name}</h1>
      <div className="space-y-4">
      <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium">📧 Email:</span> {Vendor.email}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium">📞 Phone:</span> {Vendor.phone}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium">📍 Location:</span> {Vendor.location}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium">🖼️ Image:</span> {Vendor.image}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium">ℹ️ About:</span>{' '}
          {Vendor.description || 'No description available'}
        </p>
    </div>
  </div>
)
};

export default VendorDetails;