import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import { FaShoppingCart } from 'react-icons/fa';

import Swal from 'sweetalert2';
import useCart from '../../../hooks/useCart';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const { cart } = useCart(); // Destructure cart and isLoading

  const navOptions = (
    <>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/menu'>Menu</Link>
      </li>
      <li>
        <Link to='/secret'>Secret</Link>
      </li>
      <li>
        <Link to='/order-food'>Order Food</Link>
      </li>
      <li>
        <Link to='/dashboard/cart' className='relative'>
          <FaShoppingCart className='text-2xl' />
          <div className='badge badge-warning font-medium absolute top-0'>
            {cart.length}
          </div>
        </Link>
      </li>
    </>
  );

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: 'Logout Success',
          icon: 'success',
        });
        navigate('/login');
      })
      .catch(() => {
        Swal.fire({
          title: 'Logout error',
          icon: 'error',
        });
      });
  };

  return (
    <div>
      <div className='navbar sticky z-40  text-white bg-black bg-opacity-60 '>
        <div className='navbar-start'>
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
            >
              {navOptions}
            </ul>
          </div>
          <Link to='/' className=' font-semibold cursor-pointer text-2xl'>
            Bistro Boss <br />
            Restaurant
          </Link>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>{navOptions}</ul>
        </div>
        <div className='navbar-end'>
          {user ? (
            <button className='btn btn-active text-xl' onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to='/login'>
              <button className='btn btn-warning text-xl'>Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
