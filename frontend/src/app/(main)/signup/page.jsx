'use client';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Ring } from 'ldrs/react';
import 'ldrs/react/Ring.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(/[a-z]/, 'Must contain a lowercase letter')
    .matches(/[A-Z]/, 'Must contain an uppercase letter')
    .matches(/[0-9]/, 'Must contain a number')
    .matches(/[\w]/, 'Must contain a special character'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const Signup = () => {
  const router = useRouter();
  const [passwordHidden, setPasswordHidden] = useState(true);

  const SignupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values, { resetForm }) => {
      axios
        .post('http://localhost:5000/user/add', values)
        .then(() => {
          toast.success('User registered successfully');
          resetForm();
          router.push('/login');
        })
        .catch(() => {
          toast.error('Error registering user');
        });
    },
    validationSchema: SignupSchema,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black py-10">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-3xl shadow-2xl dark:bg-neutral-900 dark:border-neutral-700 p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
            Signup
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
            Already have an account?{' '}
            <a
              className="text-blue-600 hover:underline font-medium dark:text-blue-500"
              href="/login"
            >
              Sign in here
            </a>
          </p>
        </div>
        <button
          type="button"
          className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800 dark:border-neutral-700 dark:hover:shadow-xl transition-transform transform hover:scale-105"
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
          Sign up with Google
        </button>
        <div className="py-6 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-300 before:me-6 after:flex-1 after:border-t after:border-gray-300 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
          Or
        </div>
        <form onSubmit={SignupForm.handleSubmit}>
          <div className="grid gap-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={SignupForm.handleChange}
                value={SignupForm.values.name}
                className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-700"
                placeholder="John Doe"
              />
              {SignupForm.errors.name && SignupForm.touched.name && (
                <p className="text-xs text-red-600 mt-2">
                  {SignupForm.errors.name}
                </p>
              )}
            </div>
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
                onChange={SignupForm.handleChange}
                value={SignupForm.values.email}
                className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-700"
                placeholder="you@example.com"
              />
              {SignupForm.errors.email && SignupForm.touched.email && (
                <p className="text-xs text-red-600 mt-2">
                  {SignupForm.errors.email}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 dark:text-white"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordHidden ? 'password' : 'text'}
                  id="password"
                  name="password"
                  onChange={SignupForm.handleChange}
                  value={SignupForm.values.password}
                  className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-700"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setPasswordHidden(!passwordHidden)}
                >
                  {passwordHidden ? (
                    // Eye (show password)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0 2.25 3.75 7.5 9.75 7.5s9.75-5.25 9.75-7.5S17.25 4.5 12 4.5 2.25 9.75 2.25 12z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    // Eye-off (hide password)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 002.25 12c0 2.25 3.75 7.5 9.75 7.5 2.042 0 3.93-.457 5.57-1.223M6.73 6.73A9.956 9.956 0 0112 4.5c6 0 9.75 5.25 9.75 7.5 0 1.272-.592 2.773-1.57 4.223M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                    </svg>
                  )}
                </button>
              </div>
              {SignupForm.errors.password && SignupForm.touched.password && (
                <p className="text-xs text-red-600 mt-2">
                  {SignupForm.errors.password}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium mb-2 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={SignupForm.handleChange}
                value={SignupForm.values.confirmPassword}
                className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-700"
                placeholder="••••••••"
              />
              {SignupForm.errors.confirmPassword &&
                SignupForm.touched.confirmPassword && (
                  <p className="text-xs text-red-600 mt-2">
                    {SignupForm.errors.confirmPassword}
                  </p>
                )}
            </div>
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-900 dark:text-white"
              >
                I accept the{' '}
                <a
                  className="text-blue-600 hover:underline"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:bg-gradient-to-l hover:from-purple-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {
                SignupForm.isSubmitting ? (
                  <Ring
                    size="30"
                    stroke="5"
                    bgOpacity="0"
                    speed="2"
                    color="black"
                  />
                ) : (
                  'Sign up'
                )
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;