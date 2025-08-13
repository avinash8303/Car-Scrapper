'use client'
import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login Page</h1>
      
      <div className="flex gap-4">
        {/* Global button style using Tailwind */}
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Global Button
        </button>

        {/* Login button with different Tailwind styling */}
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
          Login Button
        </button>
      </div>
    </div>
  );
};

export default Login;
