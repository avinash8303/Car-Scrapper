'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';


const AddCar = () => {
  // Validation schema using Yup
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
    image: Yup.mixed()
      .required('Image is required')
  });

  // Formik initialization
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
        // 1. Upload image to Cloudinary
        const imageData = new FormData();
        imageData.append('file', values.image);
        imageData.append('upload_preset', 'CarScrapper'); // Replace with your Cloudinary upload preset
        imageData.append('cloud_name', 'dtpfnjtva'); // Replace with your Cloudinary cloud name

        const cloudinaryRes = await fetch('https://api.cloudinary.com/v1_1/dtpfnjtva/image/upload', {
          method: 'POST',
          body: imageData
        });
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
          image: cloudinaryData.secure_url
        };
        await axios.post('http://localhost:5000/car/add', carData);
        toast.success('Car added successfully');
        resetForm();
      } catch (err) {
        toast.error('Error adding car');
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black py-10">
      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="bg-white rounded-xl shadow-xs p-4 sm:p-7 dark:bg-neutral-900">
          <form onSubmit={formik.handleSubmit}>
            {/* Section: Car Details */}
            <div className="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
              <div className="sm:col-span-12">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                  Add Car Details
                </h2>
              </div>

              {/* Brand */}
              <div className="sm:col-span-3">
                <label htmlFor="brand" className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500">
                  Brand
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="brand"
                  name="brand"
                  type="text"
                  placeholder="Enter car brand"
                  className="py-1.5 sm:py-2 px-3 block w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  value={formik.values.brand}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.brand && formik.errors.brand && (
                  <p className="text-xs text-red-600 mt-1">{formik.errors.brand}</p>
                )}
              </div>

              {/* Model */}
              <div className="sm:col-span-3">
                <label htmlFor="model" className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500">
                  Model
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="model"
                  name="model"
                  type="text"
                  placeholder="Enter car model"
                  className="py-1.5 sm:py-2 px-3 block w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  value={formik.values.model}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.model && formik.errors.model && (
                  <p className="text-xs text-red-600 mt-1">{formik.errors.model}</p>
                )}
              </div>

              {/* Chassis Number */}
              <div className="sm:col-span-3">
                <label htmlFor="chassisNumber" className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500">
                  Chassis Number
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="chassisNumber"
                  name="chassisNumber"
                  type="text"
                  placeholder="Enter chassis number"
                  className="py-1.5 sm:py-2 px-3 block w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  value={formik.values.chassisNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.chassisNumber && formik.errors.chassisNumber && (
                  <p className="text-xs text-red-600 mt-1">{formik.errors.chassisNumber}</p>
                )}
              </div>

              {/* Registration Number */}
              <div className="sm:col-span-3">
                <label htmlFor="regNumber" className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500">
                  Registration Number
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="regNumber"
                  name="regNumber"
                  type="text"
                  placeholder="Enter registration number (default: unknown)"
                  className="py-1.5 sm:py-2 px-3 block w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  value={formik.values.regNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {/* Year */}
              <div className="sm:col-span-3">
                <label htmlFor="year" className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500">
                  Year
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="year"
                  name="year"
                  type="number"
                  placeholder="Enter manufacturing year"
                  className="py-1.5 sm:py-2 px-3 block w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  value={formik.values.year}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.year && formik.errors.year && (
                  <p className="text-xs text-red-600 mt-1">{formik.errors.year}</p>
                )}
              </div>
            </div>

            {/* Image */}
            <div className="sm:col-span-3">
              <label htmlFor="image" className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500">
                Image
              </label>
            </div>
            <div className="sm:col-span-9">
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="py-1.5 sm:py-2 px-3 block w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                onChange={event => {
                  formik.setFieldValue('image', event.currentTarget.files[0]);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.image && formik.errors.image && (
                <p className="text-xs text-red-600 mt-1">{formik.errors.image}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Add Car
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCar;