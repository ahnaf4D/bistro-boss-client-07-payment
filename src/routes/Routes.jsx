import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../pages/Home/Home/Home';
import Menu from '../pages/Menu/Menu/Menu';
import Order from '../pages/Order/Order/Order';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import Secret from '../pages/Shared/Secret/Secret';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../Layout/Dashboard';
import Cart from '../pages/Dashboard/Cart/Cart';
import AllUsers from '../pages/Dashboard/AllUsers/AllUsers';
import AddItems from '../pages/Dashboard/AddItems/AddItems';
import ManageItems from '../pages/Dashboard/ManageItems/ManageItems';
import UpdateItem from '../pages/Dashboard/UpdateItem/UpdateItem';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: 'menu',
        element: <Menu></Menu>,
      },
      {
        path: 'order-food',
        element: <Order></Order>,
      },
      {
        path: 'secret',
        element: (
          <PrivateRoute>
            <Secret></Secret>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login></Login>,
  },
  {
    path: '/register',
    element: <Signup></Signup>,
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: 'cart', // Changed to relative path
        element: <Cart></Cart>,
      },
      // admin routes
      {
        path: 'users',
        element: <AllUsers></AllUsers>,
      },
      {
        path: 'add-items',
        element: <AddItems></AddItems>,
      },
      {
        path: 'manage-items',
        element: <ManageItems></ManageItems>,
      },
      {
        path: 'update-item/:id',
        element: <UpdateItem></UpdateItem>,
        loader: ({ params }) =>
          fetch(`https://bistro-server154.vercel.app/menu/${params.id}`),
      },
    ],
  },
]);
