import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { cart, refetch } = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post(`/create-payment-intent`, { price: totalPrice })
        .then((res) => {
          console.log(res.data);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    if (error) {
      console.log('[error]', error);
      setError(error?.message);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setError('');
    }
    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous',
          },
        },
      });
    if (confirmError) {
      console.log('confirm error');
    } else {
      console.log('payment intent', paymentIntent);
    }
    if (paymentIntent.status === 'succeeded') {
      console.log('transaction id', paymentIntent.id);
      setTransactionId(paymentIntent.id);

      // save payment info to our database
      const payment = {
        email: user.email,
        price: totalPrice,
        transactionId: paymentIntent.id,
        date: new Date(), // utc date convert use moment.js
        cartIds: cart.map((item) => item._id),
        menuItemIds: cart.map((item) => item.menuId),
        status: 'pending',
      };
      const { data } = await axiosSecure.post(`/payments`, payment);
      console.log(data);
      refetch();
      if (data?.paymentResult?.insertedId) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '🎉Payment Successful',
          timer: 2000,
          showCancelButton: false,
        });
        navigate('/dashboard/payment-history');
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        ></CardElement>
        <button
          type='submit'
          className='btn btn-warning my-4'
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className='text-red-500 text-xl font-medium'>{error}</p>
      </form>
      {transactionId && (
        <p className='text-2xl text-green-700'>Payment Successful!!!</p>
      )}
    </div>
  );
};

export default CheckoutForm;
