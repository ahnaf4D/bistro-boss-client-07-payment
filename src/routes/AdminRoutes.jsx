import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';

const AdminRoutes = ({ children }) => {
  const [user, loading] = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();
  if (loading || isAdminLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <span className='loading loading-bars loading-lg text-primary text-3xl'></span>
      </div>
    );
  }
  if (user && isAdmin) {
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

export default AdminRoutes;
