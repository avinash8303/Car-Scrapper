import React from 'react';
import AdminNavbar from './AdminNavbar';

const Layout = ({ children }) => {
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