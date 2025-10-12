'use client'
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const VendorLogin = () => {
  const router = useRouter();

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      console.log(values);
      axios.post('http://localhost:5000/vendor/authenticate', values)
        .then((result) => {
          console.log(result);
          if (result.data?.token) {
            localStorage.setItem('vendor-token', result.data.token)
          }
          toast.success('Login successful!');
          router.push('/vendor/dashboard');
        }).catch((err) => {
          console.log(err);
          toast.error('Login failed! Please check your credentials.');
        });
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-white py-10">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-2xl dark:bg-neutral-900 dark:border-neutral-700 p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-extrabold bg-gradient-to-r from-[#F97316] via-[#10B981] to-[#1A2E40] bg-clip-text text-transparent animate-gradient"
            style={{
              backgroundSize: '200% 200%',
              animation: 'gradientMove 3s linear infinite'
            }}
          >
            Vendor Login
          </h1>
          <style jsx>{`
            @keyframes gradientMove {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
            .animate-gradient {
              background-size: 200% 200%;
              animation: gradientMove 3s linear infinite;
            }
          `}</style>
          <p className="mt-2 text-sm text-[#10B981]">
            Don't have an account yet?{' '}
            <a
              className="text-[#F97316] hover:underline font-medium"
              href="/vendor-signup"
            >
              Sign up here
            </a>
          </p>
        </div>
       
        <form onSubmit={loginForm.handleSubmit}>
          <div className="grid gap-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 dark:text-white"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-700"
                placeholder="vendor@example.com"
                required
                value={loginForm.values.email || ''}
                onChange={loginForm.handleChange}
              />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium dark:text-white"
                >
                  Password
                </label>
                <a
                  href="/recover-password"
                  className="text-sm text-blue-600 hover:underline dark:text-blue-500"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-700"
                placeholder="••••••••"
                required
                value={loginForm.values.password || ''}
                onChange={loginForm.handleChange}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-sm text-gray-600 dark:text-neutral-400"
              >
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:bg-gradient-to-l hover:from-purple-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorLogin;