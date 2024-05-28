import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdDelete, MdManageAccounts } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');

      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: 'Deleted!',
              text: 'User has been deleted.',
              icon: 'success',
            });
          }
        });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${user.name} is an admin now!`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  return (
    <>
      <div className='flex flex-col items-center my-6 space-y-4'>
        <h2 className='text-4xl font-extrabold text-gray-900'>All Users</h2>
        <h2 className='text-2xl font-medium text-gray-700'>
          Total Users: {users.length}
        </h2>
      </div>
      <div className='overflow-x-auto shadow-2xl rounded-lg'>
        <table className='min-w-full bg-white rounded-lg'>
          <thead className='bg-gray-900 text-white'>
            <tr>
              <th className='py-3 px-6'>Sr.</th>
              <th className='py-3 px-6'>Name</th>
              <th className='py-3 px-6'>Email</th>
              <th className='py-3 px-6'>Role</th>
              <th className='py-3 px-6'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                className='bg-gray-100 border-b hover:bg-gray-200 transition-colors duration-200'
                key={user._id}
              >
                <td className='py-3 px-6 text-center'>{index + 1}</td>
                <td className='py-3 px-6 text-left'>{user.name}</td>
                <td className='py-3 px-6 text-left'>{user.email}</td>
                <td className='py-3 px-6 text-center'>
                  {user.role === 'admin' ? (
                    <div className='tooltip tooltip-right' data-tip='Admin'>
                      <span className='inline-block p-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-full text-center cursor-pointer'>
                        <MdManageAccounts className='text-4xl' />
                      </span>
                    </div>
                  ) : (
                    <div
                      className='tooltip tooltip-right'
                      data-tip='General User'
                    >
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className='btn btn-error text-2xl bg-orange-500 text-white   hover:bg-orange-600 transition-colors duration-200'
                      >
                        <FaUsers />
                      </button>
                    </div>
                  )}
                </td>
                <td className='py-3 px-6 text-center'>
                  <button
                    className='btn btn-error text-white text-2xl bg-red-500 p-2 rounded-full hover:bg-red-600 transition-colors duration-200'
                    onClick={() => handleDelete(user._id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllUsers;
