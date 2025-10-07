'use client';

import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const Login = () => {

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      console.log(values);
      axios.post('http://localhost:5000/user/authenticate', values)
        .then((result) => {
          console.log(result);
          if (result.data?.token) {
            localStorage.setItem('token', result.data.token)
            localStorage.setItem('user', JSON.stringify(result.data))
          }
          toast.success('Login successful!');
          if (result.data.role === 'admin') {
            router.push('/admin/dashboard')
            return;
          } else {
            router.push('/user/profile')
          }
        }).catch((err) => {
          console.log(err);
          toast.error('Login failed! Please check your credentials.');
        });
    }
  })

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] py-10">
      <div className="w-full max-w-md bg-white border border-[#4B5563] rounded-3xl shadow-xl p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold bg-gradient-to-r from-[#F97316] via-[#10B981] to-[#1A2E40] bg-clip-text text-transparent animate-gradient"
            style={{
              backgroundSize: '200% 200%',
              animation: 'gradientMove 3s linear infinite'
            }}
          >
            Login
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
          <p className="mt-3 text-sm text-[#10B981]">
            Don't have an account yet?{' '}
            <a
              className="text-[#F97316] hover:underline font-medium"
              href="/signup"
            >
              Sign up
            </a>
          </p>
        </div>
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-[#4B5563] bg-white text-[#1A2E40] shadow hover:bg-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-transform transform hover:scale-105"
        >
          <svg
            className="w-5 h-5"
            width="20"
            height="20"
            viewBox="0 0 46 47"
            fill="none"
          >
            <path
              d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
              fill="#4285F4"
            />
            <path
              d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
              fill="#34A853"
            />
            <path
              d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
              fill="#FBBC05"
            />
            <path
              d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
              fill="#EB4335"
            />
          </svg>
          Login with Google
        </button>
        <div className="py-6 flex items-center text-xs text-[#6B7280] uppercase before:flex-1 before:border-t before:border-[#4B5563] before:me-6 after:flex-1 after:border-t after:border-[#4B5563] after:ms-6">
          Or
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
                className="py-3 px-4 block w-full bg-white border border-[#4B5563] rounded-lg text-sm text-[#6B7280] shadow-sm focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316] focus:outline-none"
                required
                placeholder="you@example.com"
                value={loginForm.values.email || ''}
                onChange={loginForm.handleChange}
              />
            </div>
            <div>
              <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium dark:text-white"
                >
                  Password
                </label>
                <a
                  className="text-sm text-blue-600 hover:underline font-medium dark:text-blue-500"
                  href="/recover-account"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="py-3 px-4 block w-full bg-white border border-[#4B5563] rounded-lg text-sm text-[#6B7280] shadow-sm focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316] focus:outline-none"
                  required
                  placeholder="••••••••"
                  value={loginForm.values.password || ''}
                  onChange={loginForm.handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F97316] text-sm focus:outline-none"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="shrink-0 mt-0.5 border-[#4B5563] rounded-sm text-[#F97316] focus:ring-[#F97316]"
              />
              <label htmlFor="remember-me" className="ms-2 text-sm text-[#111827]">
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-base font-semibold rounded-lg border border-transparent bg-[#F97316] text-white shadow hover:bg-[#EA580C] focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-transform transform hover:scale-105"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
