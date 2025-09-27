'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const VendorProfile = () => {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Assuming you store vendorId in localStorage after login
        const token = localStorage.getItem('vendor-token');
        if (!token) {
          setError('No vendor logged in');
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/vendor/getvendor`,
          {headers: { Authorization: `Bearer ${token}` }}
        );
        setVendor(res.data);
      } catch (err) {
        console.error('Error fetching vendor profile:', err);
        setError('Unable to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-lg font-medium">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500 text-lg font-medium">
        {error}
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 text-lg font-medium">
        No profile found
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-neutral-900 shadow-md rounded-xl p-6 mt-10">
      <h1 className="text-3xl font-semibold text-center mb-6">My Profile</h1>
      <div className="space-y-4">
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium">👤 Name:</span> {vendor.name}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium">📧 Email:</span> {vendor.email}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium">📞 Phone: 8303892836</span> {vendor.phone}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium">📍 Location: Lucknow,India</span> {vendor.location}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium">ℹ️ About:</span>{' '}
          {vendor.description || 'No description available'}
        </p>
      </div>

      {/* Edit Profile Button */}
      <div className="mt-6 text-center">
        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default VendorProfile;
