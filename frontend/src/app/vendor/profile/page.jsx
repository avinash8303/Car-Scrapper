'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';

const Profile = () => {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  const getProfileData = (token) => {
    if (!token) {
      toast.error('❌ No token found. Please login again.');
      router.replace('/login');
      return;
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/vendor/getvendor`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setProfile(result.data.user || result.data);
      })
      .catch((err) => {
        console.error('Profile fetch error:', err);
        if (err.response && err.response.status === 403) {
          toast.error('❌ Session expired. Please login again.');
          localStorage.removeItem('token');
          router.replace('/login');
        } else {
          toast.error('❌ Error fetching profile data');
        }
      });
  };

  useEffect(() => {
    const storedToken =
      typeof window !== 'undefined' ? localStorage.getItem('vendor-token') : null;
    setToken(storedToken);
    if (storedToken) getProfileData(storedToken);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB] px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-200"
      >
        <div className="flex flex-col items-center mb-8">
          <FaUserCircle className="text-6xl text-[#3B82F6] drop-shadow-lg mb-3" />
          <h2 className="text-3xl font-extrabold text-[#1E293B]">
            Vendor Profile
          </h2>
          <p className="text-gray-500 mt-1">
            Manage and view your account information
          </p>
        </div>

        {profile ? (
          <div className="space-y-6">
            <div className="bg-[#F9FAFB] rounded-xl p-4 shadow-inner border border-gray-200 hover:shadow-md transition-all">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Name:</span>
                <span className="text-[#111827] font-medium">
                  {profile.name || 'N/A'}
                </span>
              </div>
            </div>

            <div className="bg-[#F9FAFB] rounded-xl p-4 shadow-inner border border-gray-200 hover:shadow-md transition-all">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Email:</span>
                <span className="text-[#111827] font-medium">
                  {profile.email || 'N/A'}
                </span>
              </div>
            </div>

            <div className="bg-[#F9FAFB] rounded-xl p-4 shadow-inner border border-gray-200 hover:shadow-md transition-all">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">City:</span>
                <span className="text-[#111827] font-medium">
                  {profile.city || 'Unknown'}
                </span>
              </div>
            </div>

            <div className="bg-[#F9FAFB] rounded-xl p-4 shadow-inner border border-gray-200 hover:shadow-md transition-all">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Joined:</span>
                <span className="text-[#111827] font-medium">
                  {profile.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString()
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-10 text-gray-400 animate-pulse">
            Loading profile...
          </div>
        )}

        {profile && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              localStorage.removeItem('token');
              toast.success('✅ Logged out successfully!');
              router.push('/login');
            }}
            className="w-full mt-10 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-semibold py-3 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            Logout
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
