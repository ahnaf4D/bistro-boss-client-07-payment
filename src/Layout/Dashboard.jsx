import { NavLink, Outlet } from 'react-router-dom';
import { BsCartPlusFill } from 'react-icons/bs';
import {
  FaBook,
  FaCalendar,
  FaCommentAlt,
  FaEnvelope,
  FaHome,
  FaList,
  FaUsers,
  FaUtensils,
} from 'react-icons/fa';
import { BiSolidFoodMenu } from 'react-icons/bi';
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
  const { cart } = useCart();
  const [isAdmin] = useAdmin();
  // console.log(object);

  return (
    <div className='flex'>
      <div className='w-64 min-h-screen bg-[#D1A054]'>
        <ul className='menu text-xl'>
          {isAdmin ? (
            <>
              <li>
                <NavLink to='/dashboard/admin-home'>
                  <FaHome></FaHome>
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/add-items'>
                  <FaUtensils></FaUtensils>
                  Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/manage-items'>
                  <FaList />
                  Manage Items
                  {/* <span className='badge badge-warning font-medium'>
                    {cart.length}
                  </span> */}
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/manage-bookings'>
                  <FaBook></FaBook>
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/users'>
                  <FaUsers />
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to='/dashboard/user-home'>
                  <FaHome></FaHome>
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/reservation'>
                  <FaCalendar></FaCalendar>
                  Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/review'>
                  <FaCommentAlt></FaCommentAlt>
                  Add a review
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/cart'>
                  <BsCartPlusFill />
                  My Cart
                  <span className='badge badge-warning font-medium'>
                    {cart.length}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/bookings'>
                  <FaList />
                  My Bookings
                </NavLink>
              </li>
            </>
          )}

          {/* Shared Admin */}
          <div className='divider'></div>
          <li>
            <NavLink to='/'>
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/order-food'>
              <BiSolidFoodMenu />
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to='/order/contact'>
              <FaEnvelope></FaEnvelope>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Dashboard cart */}
      <div className='flex-1 p-8'>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
