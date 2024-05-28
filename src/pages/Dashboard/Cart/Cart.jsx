import { MdDelete } from 'react-icons/md';
import useCart from '../../../hooks/useCart';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Cart = () => {
  const { cart, refetch } = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();
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
        axiosSecure.delete(`/cart/${id}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          }
        });
      }
    });
  };
  return (
    <div className='container mx-auto p-6'>
      <div className='bg-white shadow-md rounded-lg p-6 mb-4'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-4xl font-bold'>Items: {cart.length}</h2>
          <h2 className='text-4xl font-bold'>
            Total Price: ${totalPrice.toFixed(2)}
          </h2>
          <button className='btn btn-warning text-xl'>Checkout Now</button>
        </div>
        <div className='overflow-x-auto'>
          <table className='table-auto w-full'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='px-4 py-2'>Item Image</th>
                <th className='px-4 py-2'>Item Name</th>
                <th className='px-4 py-2'>Price</th>
                <th className='px-4 py-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id} className='border-t'>
                  <td className='px-4 py-2'>
                    <div className='flex items-center'>
                      <div className='avatar'>
                        <div className='mask mask-squircle w-12 h-12'>
                          <img src={item.image} alt={item.name} />
                        </div>
                      </div>
                      <div className='ml-3'>
                        <div className='font-bold'>{item.name}</div>
                        <div className='text-sm text-gray-500'>
                          United States
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='px-4 py-2'>{item.name}</td>
                  <td className='px-4 py-2'>${item.price.toFixed(2)}</td>
                  <td className='px-4 py-2'>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className='btn btn-error text-2xl flex items-center'
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
    </div>
  );
};

export default Cart;
