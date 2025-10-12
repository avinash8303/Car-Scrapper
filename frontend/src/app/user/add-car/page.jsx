'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaCarSide, FaUpload } from 'react-icons/fa';

const AddCar = () => {
  const [preview, setPreview] = useState(null);

  const AddCarSchema = Yup.object().shape({
    brand: Yup.string().required('Brand is required'),
    model: Yup.string().required('Model is required'),
    chassisNumber: Yup.string()
      .required('Chassis Number is required')
      .matches(/^[a-zA-Z0-9]+$/, 'Chassis Number must be alphanumeric'),
    regNumber: Yup.string().default('unknown'),
    year: Yup.number()
      .required('Year is required')
      .min(1900, 'Year must be after 1900')
      .max(new Date().getFullYear(), 'Year cannot be in the future'),
    image: Yup.mixed().required('Image is required'),
  });

  const formik = useFormik({
    initialValues: {
      brand: '',
      model: '',
      chassisNumber: '',
      regNumber: '',
      year: '',
      image: null,
    },
    validationSchema: AddCarSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const imageData = new FormData();
        imageData.append('file', values.image);
        imageData.append('upload_preset', 'CarScrapper');
        imageData.append('cloud_name', 'dtpfnjtva');

        const cloudinaryRes = await fetch(
          'https://api.cloudinary.com/v1_1/dtpfnjtva/image/upload',
          { method: 'POST', body: imageData }
        );
        const cloudinaryData = await cloudinaryRes.json();
        if (!cloudinaryData.secure_url) throw new Error('Image upload failed');
        // Log success if image is uploaded
        console.log('Image successfully uploaded to Cloudinary:', cloudinaryData.secure_url);

        // 2. Send car data (with image URL) as JSON to backend
        const carData = {
          brand: values.brand,
          model: values.model,
          chassisNumber: values.chassisNumber,
          regNumber: values.regNumber,
          year: values.year,
          image: cloudinaryData.secure_url,
        };

        await axios.post('http://localhost:5000/car/add', carData, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        toast.success('🚗 Car added successfully!');
        resetForm();
        setPreview(null);
      } catch (err) {
        toast.error('❌ Error adding car');
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <FaCarSide className="text-5xl text-blue-600 mb-3" />
          <h2 className="text-3xl font-bold text-gray-800 text-center">Add New Car</h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter the car details and upload an image.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              placeholder="e.g., Toyota"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              {...formik.getFieldProps('brand')}
            />
            {formik.touched.brand && formik.errors.brand && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.brand}</p>
            )}
          </div>

          {/* Model */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
            <input
              type="text"
              id="model"
              name="model"
              placeholder="e.g., Fortuner"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              {...formik.getFieldProps('model')}
            />
            {formik.touched.model && formik.errors.model && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.model}</p>
            )}
          </div>

          {/* Chassis Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Chassis Number</label>
            <input
              type="text"
              id="chassisNumber"
              name="chassisNumber"
              placeholder="Enter chassis number"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              {...formik.getFieldProps('chassisNumber')}
            />
            {formik.touched.chassisNumber && formik.errors.chassisNumber && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.chassisNumber}</p>
            )}
          </div>

          {/* Registration Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
            <input
              type="text"
              id="regNumber"
              name="regNumber"
              placeholder="e.g., DL03AB1234"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              {...formik.getFieldProps('regNumber')}
            />
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              placeholder="e.g., 2020"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              {...formik.getFieldProps('year')}
            />
            {formik.touched.year && formik.errors.year && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.year}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Car Image</label>
            <div className="relative w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-all bg-gray-50">
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  formik.setFieldValue('image', file);
                  if (file) setPreview(URL.createObjectURL(file));
                }}
                onBlur={formik.handleBlur}
              />
              <FaUpload className="text-3xl mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">Click or drag to upload</p>
            </div>

            {preview && (
              <div className="mt-4 flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="rounded-lg shadow-md w-48 h-32 object-cover border border-gray-200"
                />
              </div>
            )}

            {formik.touched.image && formik.errors.image && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.image}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition-all py-3 rounded-lg font-semibold text-white shadow-md"
          >
            Add Car
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddCar;

