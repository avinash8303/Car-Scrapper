'use client';
import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Profile = () => {

    const token = localStorage.getItem('token');
    const router = useRouter();

    const getProfileData = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getuser`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((result) => {
                console.log(result.data);

            }).catch((err) => {
                console.log(err);

                toast.error("❌ " + ("Error fetching profile data"));
                // localStorage.removeItem('token');
                router.replace('/signup');

            });
    }

    useEffect(() => {
        getProfileData();
    }, [])


    return (
        <div>Profile</div>
    )
}

export default Profile;