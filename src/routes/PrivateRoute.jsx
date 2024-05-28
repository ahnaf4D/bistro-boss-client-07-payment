import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <span className='loading loading-bars loading-lg text-primary text-3xl'></span>
      </div>
    );
  }
  if (user?.email) {
    return children;
  }
  return (
    <Navigate
      to='/login'
      replace
      state={{ from: location.pathname }}
    ></Navigate>
  );
};

export default PrivateRoute;
