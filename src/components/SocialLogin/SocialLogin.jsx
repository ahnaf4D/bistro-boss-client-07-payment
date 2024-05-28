import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    signInWithGoogle().then((res) => {
      const user = res?.user;
      const userDetails = {
        email: user?.email,
        name: user?.displayName,
      };

      axiosPublic.post(`/users`, userDetails).then((res) => {
        console.log(res.data);
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Successfully Login with Google',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/');
    });
  };
  return (
    <div>
      <button
        className='btn btn-warning text-xl my-6'
        onClick={handleGoogleSignIn}
      >
        <FaGoogle></FaGoogle>
        Sign in Google
      </button>
    </div>
  );
};

export default SocialLogin;
