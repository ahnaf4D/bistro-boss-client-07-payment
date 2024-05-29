import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], refetch } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);

      return res.data;
    },
  });
  refetch();
  console.log(payments);
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-center text-4xl font-bold text-black mb-8'>
        Total Payments: {payments.length}
      </h1>
      <div className='overflow-x-auto shadow-lg rounded-lg border border-gray-200'>
        <table className='min-w-full text-center bg-white'>
          <thead className='bg-gray-500 text-white'>
            <tr>
              <th className='w-1/4 py-3 px-4 uppercase font-semibold text-sm'>
                Transaction ID
              </th>
              <th className='w-1/4 py-3 px-4 uppercase font-semibold text-sm'>
                Date
              </th>
              <th className='w-1/4 py-3 px-4 uppercase font-semibold text-sm'>
                Amount
              </th>
              <th className='w-1/4 py-3 px-4 uppercase font-semibold text-sm'>
                Email
              </th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {payments.map((item) => (
              <tr
                className='hover:bg-gray-100 transition-colors duration-200'
                key={item._id}
              >
                <td className='w-1/4 py-3 px-4 border-b border-gray-200'>
                  {item.transactionId}
                </td>
                <td className='w-1/4 py-3 px-4 border-b border-gray-200'>
                  {new Date(item.date).toLocaleString()}
                </td>
                <td className='w-1/4 py-3 px-4 border-b border-gray-200'>
                  ${item.price.toFixed(2)}
                </td>
                <td className='w-1/4 py-3 px-4 border-b border-gray-200'>
                  {item.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
