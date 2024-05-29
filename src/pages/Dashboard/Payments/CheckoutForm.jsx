import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCart from '../../../hooks/useCart';

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { cart } = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  useEffect(() => {
    axiosSecure
      .post(`/create-payment-intent`, { price: totalPrice })
      .then((res) => {
        console.log(res.data);
        setClientSecret(res.data.clientSecret);
      });
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
    </div>
  );
};

export default CheckoutForm;
