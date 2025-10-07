'use client';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import axios from 'axios'
import Link from 'next/link';
import React, { useEffect, useInsertionEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ManageUser = () => {

  const [carList, setCarList] = useState([]);

  const fetchCars = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/car/getall`)
    console.table(res.data);
    setCarList(res.data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const deleteCar = (id) => {
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/car/delete/${id}`)
      .then((result) => {
        toast.success("Car deleted successfully");
        fetchCars();
      }).catch((err) => {
        console.error(err);
        toast.error("Failed to delete car");
      });
  }

  return (
    <div>
      <div className='container mx-auto mt-5'>
        <h1 className='text-center font-bold'>Manage Cars</h1>
        <table className='w-full mt-5 border'>
          <thead>
            <tr>
              <th className='p-3'>Brand</th>
              <th className='p-3'>Model</th>
              <th className='p-3'>Year</th>
              <th className='p-3'>Reg No.</th>
              <th className='p-3'>Chassis Number</th>
              <th className='p-3'>Created At</th>
              <th className='p-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              carList.map((car) => (
                <tr key={car._id}>
                  <td className='p-2 border border-gray-300'>{car.brand}</td>
                  <td className='p-2 border border-gray-300'>{car.model}</td>
                  <td className='p-2 border border-gray-300'>{car.year}</td>
                  <td className='p-2 border border-gray-300'>{car.regNumber}</td>
                  <td className='p-2 border border-gray-300'>{car.chassisNumber}</td>
                  <td className='p-2 border border-gray-300'>{car.createdAt ? new Date(car.createdAt).toLocaleDateString() : ''}</td>
                  <td className='p-2 border border-gray-300 flex gap-2'>
                    <button
                      onClick={() => deleteCar(car._id)}
                      className='bg-red-500 text-white px-3 py-1 rounded'>
                      <IconTrash />
                    </button>
                    <Link href={'/update-car/' + car._id}
                      className='block w-fit bg-blue-500 text-white px-3 py-1 rounded'>
                      <IconPencil />
                    </Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageUser;