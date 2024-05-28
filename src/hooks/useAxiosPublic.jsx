import axios from 'axios';
const axiosSecure = axios.create({
  baseURL: `https://bistro-server154.vercel.app`,
});
const useAxiosPublic = () => {
  return axiosSecure;
};

export default useAxiosPublic;
