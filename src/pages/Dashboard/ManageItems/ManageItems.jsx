import React from 'react';
import { MdDelete } from 'react-icons/md';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import { FaRegEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const ManageItems = () => {
  const [menu, loading, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();
  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <span className='loading loading-bars loading-lg text-[#D1A054] text-3xl'></span>
      </div>
    );
  }
  const handleDelete = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        console.log(res.data);
        if (res.data.acknowledged) {
          refetch();
          Swal.fire({
            title: 'Deleted!',
            text: `${item.name} Deleted from the menu`,
            icon: 'success',
          });
        }
      }
    });
  };
  return (
    <div className='p-4'>
      <SectionTitle heading='Manage All Items' subheading='Hurry up' />
      <h1 className='text-3xl my-4 font-semibold'>
        Total Items: {menu.length}
      </h1>
      <div className='overflow-x-auto shadow-md rounded-lg'>
        <table className='min-w-full bg-white border border-gray-300'>
          <thead className='bg-gray-800 text-white'>
            <tr>
              <th className='py-3 px-4 border-b'>Sr.</th>
              <th className='py-3 px-4 border-b'>Item Image</th>
              <th className='py-3 px-4 border-b'>Item Name</th>
              <th className='py-3 px-4 border-b'>Price</th>
              <th className='py-3 px-4 border-b'>Action</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item, index) => (
              <tr key={item._id} className='hover:bg-gray-100'>
                <td className='py-3 px-4 border-b text-center'>{index + 1}</td>
                <td className='py-3 px-4 border-b'>
                  <div className='flex items-center gap-3'>
                    <div className='avatar'>
                      <div className='mask mask-squircle w-12 h-12'>
                        <img
                          src={item.image}
                          alt={item.name}
                          className='object-cover'
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className='py-3 px-4 border-b'>{item.name}</td>
                <td className='py-3 px-4 border-b'>${item.price}</td>
                <td className='py-3 px-4 border-b flex justify-center gap-2'>
                  <Link to={`/dashboard/update-item/${item._id}`}>
                    <button
                      className='btn text-2xl bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded tooltip'
                      data-tip='Edit item'
                    >
                      <FaRegEdit />
                    </button>
                  </Link>
                  <button
                    className='btn text-2xl bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded tooltip'
                    onClick={() => handleDelete(item)}
                    data-tip='Delete item'
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItems;
