import { Elements } from '@stripe/react-stripe-js';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
const Payment = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
  return (
    <div>
      <SectionTitle
        heading={'Payment'}
        subheading={'pay us as go'}
      ></SectionTitle>
      <h2 className='text-4xl my-4'>Pay Us</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
