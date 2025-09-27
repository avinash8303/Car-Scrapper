'use client';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import axios from 'axios'
import Link from 'next/link';
import React, { useEffect, useInsertionEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ManageUser = () => {

  const [userList, setUserList] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getall`)
    console.table(res.data);
    setUserList(res.data);
  };
  //use effect code.
  useEffect(() => {
    fetchUsers();
  }, []);


  const deleteUser = (id) => {
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/delete/${id}`)
      .then((result) => {
        toast.success("User deleted successfully");
        fetchUsers();
      }).catch((err) => {
        console.error(err);
        toast.error("Failed to delete user");
      });
  }

  return (
    <div>
      <div className='container mx-auto mt-5'>
        <h1 className='text-center font-bold'>Manage Users</h1>
        <table className='w-full mt-5 border'>
          <thead>
            <tr>
              <th className='p-3'>Name</th>
              <th className='p-3'>Email</th>
              {/* <th className='p-3'>Phone</th> */}
              <th className='p-3'>Created At</th>
              <th className='p-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              userList.map((user) => (
                <tr key={user._id || user.email}>
                  <td className='p-2 border border-gray-300'>{user.name}</td>
                  <td className='p-2 border border-gray-300'>{user.email}</td>
                  {/* <td className='p-2 border border-gray-300'>{user.phone}</td> */}
                  <td className='p-2 border border-gray-300'>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className='p-2 border border-gray-300 flex gap-2'>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className='bg-red-500 text-white px-3 py-1 rounded'>
                      <IconTrash />
                    </button>
                    <Link href={'/update-user/' + user._id}
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