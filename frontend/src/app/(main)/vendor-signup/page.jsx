'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { Ring } from 'ldrs/react';
import 'ldrs/react/Ring.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(/[a-z]/, 'Must contain a lowercase letter')
    .matches(/[A-Z]/, 'Must contain an uppercase letter')
    .matches(/[0-9]/, 'Must contain a number')
    .matches(/[\W]/, 'Must contain a special character'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
});

const VendorSignup = () => {
  const [passwordHidden, setPasswordHidden] = useState(true);
  const router = useRouter();

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '' },
    validationSchema: SignupSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/vendor/add`, values)
        .then(() => {
          toast.success('User registered successfully!');
          resetForm();
          router.push('/vendor-login');
        })
        .catch(() => {
          setSubmitting(false);
          toast.error('Error registering user');
        });
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-white p-10">
      <div className="w-full max-w-md p-8 sm:p-10 bg-white-900 rounded-3xl shadow-xl border border-gray-700 space-y-6">
        
        <div className="text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Vendor Signup
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Already have an account?{' '}
            <a href="/vendor-login" className="text-blue-500 hover:underline font-medium">Login here</a>
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-black  -300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full px-4 py-3 rounded-sm bg-white-400 text-black   border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-black-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white-800 text-black border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-black-300 mb-1">Password</label>
            <input
              type={passwordHidden ? 'password' : 'text'}
              name="password"
              placeholder="••••••••"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white-800 text-black border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setPasswordHidden(!passwordHidden)}
            >
              {passwordHidden ? <FaEye /> : <FaEyeSlash />}
            </span>
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-black-300 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white-800 text-black border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-center text-gray-300">
            <input type="checkbox" id="terms" className="w-4 h-4 text-purple-500 rounded focus:ring-purple-500" />
            <label htmlFor="terms" className="ml-2 text-sm">
              I accept the <a href="#" className="text-blue-500 hover:underline">Terms and Conditions</a>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold text-lg flex justify-center items-center gap-x-2 transition"
          >
            {formik.isSubmitting ? <Ring size="30" stroke="5" color="white" speed="2" /> : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendorSignup;
