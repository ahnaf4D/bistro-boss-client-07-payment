import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });
  console.log(payments);
  return (
    <div>
      <h1>Total Payments : {payments.length}</h1>
    </div>
  );
};

export default PaymentHistory;
