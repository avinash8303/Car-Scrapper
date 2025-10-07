'use client';
import React, { useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Layout = ({ children }) => {

  const router = useRouter();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      toast.error('Access denied. Admins only.');
      router.push('/login');
    }
  }, [])


  return (
    <div className="flex min-h-screen">
      <AdminNavbar />
      <main className="flex-1 ml-64 bg-gray-50 dark:bg-neutral-950 p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;