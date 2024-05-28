import { useForm } from 'react-hook-form';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    if (res.data.success) {
      const menuItem = {
        name: data.name,
        price: parseFloat(data.price),
        recipe: data.recipe,
        category: data.category,
        image: res.data.data.display_url,
      };
      const menuRes = await axiosSecure.post('/menu', menuItem);
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        reset();
        Swal.fire({
          text: `${data.name} added to the menu`,
          icon: 'success',
        });
      }
    }
  };
  return (
    <div className='p-6  min-h-screen bg-gray-100'>
      <SectionTitle
        heading={'ADD AN ITEM'}
        subheading={"What's new?"}
      ></SectionTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white mx-auto h-auto rounded-lg p-8 shadow-xl max-w-3xl'
      >
        <div className='form-control mb-6'>
          <label className='label mb-2'>
            <span className='label-text text-2xl font-semibold'>
              Recipe Name*
            </span>
          </label>
          <input
            type='text'
            {...register('name', { required: true })}
            placeholder='Recipe Name'
            className='input input-bordered w-full text-xl p-4 rounded-md border-2 focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='form-control mb-6'>
          <label className='label mb-2'>
            <span className='label-text text-2xl font-semibold'>Category*</span>
          </label>
          <select
            className='h-12 input-bordered w-full  p-3 rounded-md border-2 focus:outline-none focus:border-blue-500'
            {...register('category', { required: true })}
          >
            <option value='salad'>Salad</option>
            <option value='drinks'>Drinks</option>
            <option value='popular'>Popular</option>
            <option value='desserts'>Desserts</option>
            <option value='pizza'>Pizza</option>
            <option value='soup'>Soup</option>
            <option value='offered'>Offered</option>
          </select>
        </div>
        <div className='form-control mb-6'>
          <label className='label mb-2'>
            <span className='label-text text-2xl font-semibold'>Price*</span>
          </label>
          <input
            type='number'
            placeholder='$00.00'
            className='input input-bordered w-full text-xl p-4 rounded-md border-2 focus:outline-none focus:border-blue-500'
            {...register('price', { required: true })}
          />
        </div>
        <div className='form-control mb-6'>
          <label className='label mb-2'>
            <span className='label-text text-2xl font-semibold'>
              Recipe Details*
            </span>
          </label>
          <textarea
            placeholder='Enter the recipe details here...'
            className='textarea textarea-bordered w-full text-xl p-4 rounded-md border-2 focus:outline-none focus:border-blue-500 h-32 resize-none'
            {...register('recipe', { required: true })}
          ></textarea>
          <label className='label mt-4 mb-2'>
            <span className='label-text text-2xl font-semibold'>
              Upload Image
            </span>
          </label>
          <input
            type='file'
            {...register('image', { required: true })}
            className='file-input file-input-bordered file-input-md w-full max-w-xs'
          />
        </div>
        <div className='form-control'>
          <input
            type='submit'
            className='btn btn-primary btn-wide text-xl text-white mx-auto'
            value='Add Item'
          />
        </div>
      </form>
    </div>
  );
};

export default AddItems;
