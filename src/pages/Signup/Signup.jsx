import { useForm } from 'react-hook-form';
import LoginImage from '../../assets/others/authentication2.png';
import LoginBg from '../../assets/others/authentication.png';
import { loadCaptchaEnginge, LoadCanvasTemplate } from 'react-simple-captcha';
import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
const Signup = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { createUser, setUser, user, updateUserProfile, logOut } =
    useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.pass)
      .then(() => {
        const userInfo = {
          name: data.name,
          email: data.email,
        };
        // const loggedUser = result.user;
        axiosPublic.post('/users', userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log('user added to the database');
            Swal.fire({
              title: 'Account Creation Successfull',
              icon: 'success',
            });

            updateUserProfile(data.name);
            setUser({ ...user, photoURL: null, displayName: data.name });
            logOut();
            navigate('/login');
            reset();
          }
        });
      })
      .catch((err) => {
        console.log(err.massage);
      });
    reset();
  };
  // const handleSignUp = (e) => {
  //   e.preventDefault();
  //   const email = e.target.email.value;
  //   const password = e.target.pass.value;
  //   console.log(email, password);
  // };
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Signup</title>
      </Helmet>
      <div
        className='min-h-screen bg-no-repeat bg-cover flex items-center justify-center'
        style={{ backgroundImage: `url(${LoginBg})` }}
      >
        <div
          className=' rounded-lg shadow-2xl flex items-center justify-center flex-col lg:flex-row p-8'
          style={{ backgroundImage: `url(${LoginBg})` }}
        >
          <div className='hidden order-2 lg:block lg:w-3/4'>
            <img
              src={LoginImage}
              className='object-cover w-full h-full rounded-lg'
              alt='Login'
            />
          </div>
          <form
            className='w-full lg:w-1/2 p-6'
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className='text-3xl mb-5 text-center font-bold text-gray-700'>
              Register
            </h1>
            <div className='mb-4'>
              <label
                htmlFor='nameInput'
                className='block text-sm font-medium text-gray-600'
              >
                Your Name
              </label>
              <input
                type='text'
                {...register('name')}
                name='name'
                id='nameInput'
                placeholder='Enter Your Name'
                className='input input-primary w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none'
                required
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='emailInput'
                className='block text-sm font-medium text-gray-600'
              >
                Email Address
              </label>
              <input
                type='email'
                name='email'
                {...register('email', { required: true })}
                id='emailInput'
                placeholder='Enter your Email'
                className='input input-primary w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none'
                required
              />
              {errors.email && (
                <span className='text-red-400 text-[16px] font-medium'>
                  This field is required
                </span>
              )}
            </div>
            <div className='mb-6'>
              <label
                htmlFor='passwordInput'
                className='block text-sm font-medium text-gray-600'
              >
                Password
              </label>
              <input
                type='password'
                {...register('pass', {
                  required: true,
                  minLength: 6,
                  maxLength: 10,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
                })}
                name='pass'
                id='passwordInput'
                placeholder='Enter your Password'
                className='input input-primary w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none'
              />
              {errors.pass?.type === 'required' && (
                <span className='text-red-400 text-[16px] font-medium'>
                  This field is required
                </span>
              )}
              {errors.pass?.type === 'maxLength' && (
                <span className='text-red-400 text-[16px] font-medium'>
                  Max length is 10
                </span>
              )}
              {errors.pass?.type === 'minLength' && (
                <span className='text-red-400 text-[16px] font-medium'>
                  Min length is 6
                </span>
              )}
              {errors.pass?.type === 'pattern' && (
                <span className='text-red-400 text-[16px] font-medium'>
                  Password needs uppercase, lowercase, digit, special character.
                </span>
              )}
            </div>
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-600'>
                <button>
                  <LoadCanvasTemplate />
                </button>
              </label>
              <input
                type='text'
                name='captcha'
                placeholder='type Valid Captcha'
                className='input input-primary w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none'
                // required
              />
              <button className='btn btn-xs btn-success'>Validate</button>
            </div>
            <div className='flex items-center justify-center'>
              <input
                type='submit'
                value='Register'
                className='btn btn-wide text-xl text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 rounded-lg px-6 py-2'
              />
            </div>
            <p className='text-lg font-medium text-center'>
              Old User? Go to{' '}
              <Link to='/login' className='link-primary'>
                Login
              </Link>
            </p>
            <SocialLogin></SocialLogin>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
