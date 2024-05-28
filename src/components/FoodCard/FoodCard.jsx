import PropTypes from 'prop-types';

import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';
const FoodCard = ({ food }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch } = useCart();
  const handleAddToCart = (food) => {
    if (user && user?.email) {
      console.log(user?.email, food);
      const cartItem = {
        menuId: food._id,
        email: user?.email,
        name: food.name,
        image: food.image,
        price: food.price,
      };
      axiosSecure.post(`/carts`, cartItem).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully Added to Cart',
            showConfirmButton: false,
            timer: 1000,
          });
          // refetch the cart
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: 'You are Not Logged in',
        text: 'Must Login before adding to the cart',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Log in',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location.pathname } });
        }
      });
    }
  };
  return (
    <div>
      <div className='card card-compact  bg-gray-200 p-4 shadow'>
        <figure className='relative'>
          <img src={food.image} alt='Shoes' width={275} height={183} />
          <p className='absolute top-4  p-2 ml-48 rounded text-xl bg-gray-800 text-white'>
            ${food.price}
          </p>
        </figure>
        <div className='card-body text-center'>
          <h2 className='card-title text-center mx-auto'>{food.name}</h2>
          <p>{food.recipe}</p>
          <div className='card-actions justify-center '>
            <button
              className='btn text-orange-400 bg-gray-700 hover:bg-slate-200 hover:text-black'
              onClick={() => handleAddToCart(food)}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
// Props types
FoodCard.propTypes = {
  food: PropTypes.object,
};
