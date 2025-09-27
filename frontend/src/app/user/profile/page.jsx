'use client';
import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

const Profile = () => {

    const [token, setToken] = useState(null);
    const router = useRouter();

    const [profile, setProfile] = useState(null);

    const getProfileData = (token) => {
        if (!token) {
            toast.error("❌ No token found. Please login again.");
            router.replace('/login');
            return;
        }
        console.log('Using token:', token);
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getuser`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((result) => {
                setProfile(result.data.user || result.data);
            }).catch((err) => {
                console.log('Profile fetch error:', err);
                if (err.response && err.response.status === 403) {
                    toast.error("❌ Forbidden: Invalid or expired token. Please login again.");
                    localStorage.removeItem('token');
                    router.replace('/login');
                } else {
                    toast.error("❌ Error fetching profile data");
                }
            });
    }

    useEffect(() => {
        const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        setToken(storedToken);
        if (storedToken) {
            getProfileData(storedToken);
        }
    }, []);


    return (
            <div className="max-w-xl mx-auto mt-10 p-8 rounded-xl shadow-lg bg-white">
                <h2 className="mb-8 text-3xl font-bold text-center text-blue-700">User Profile</h2>
                {profile ? (
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-semibold text-gray-700">Name:</span>
                            <span className="text-gray-900">{profile.name || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-semibold text-gray-700">Email:</span>
                            <span className="text-gray-900">{profile.email || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-semibold text-gray-700">City:</span>
                            <span className="text-gray-900">{profile.city || 'Unknown'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">Joined:</span>
                            <span className="text-gray-900">{profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-400">Loading profile...</div>
                )}
            </div>
    )
}

export default Profile;