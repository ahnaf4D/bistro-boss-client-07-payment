import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import featured from '../../../assets/home/featured.jpg';
const Feature = () => {
  return (
    <div className='my-12'>
      <header>
        <div
          className='relative w-full h-full my-12 bg-opacity-80 bg-fixed bg-center bg-cover '
          style={{
            backgroundImage:
              "url('https://i.postimg.cc/SQzH4nPM/featured.jpg')",
          }}
        >
          <div className='flex flex-col items-center justify-center w-full h-full bg-gray-900/60'>
            <SectionTitle
              heading='FROM OUR MENU'
              subheading='Check it out'
            ></SectionTitle>
            <div className='flex flex-col items-center gap-6 lg:flex-row mt-8 px-4 lg:px-12'>
              <div className='w-full mb-6 lg:w-1/2 flex justify-center lg:justify-end'>
                <img
                  src='https://i.postimg.cc/SQzH4nPM/featured.jpg' // Replace with your featured image
                  alt='Featured Dish'
                  className='w-full max-w-md lg:max-w-lg rounded-lg shadow-lg'
                />
              </div>
              <div className='text-white max-w-md space-y-2 lg:w-1/2 lg:pl-12'>
                <h1 className='text-2xl font-semibold text-center lg:text-left'>
                  March 20, 2023 <br />
                  WHERE CAN I GET SOME?
                </h1>
                <p className='leading-relaxed text-center lg:text-left'>
                  Welcome to Bistro Boss, where culinary mastery meets
                  exceptional service. Indulge in our exquisite menu, crafted
                  with the finest ingredients and a passion for flavor.
                  Experience the perfect blend of ambiance and taste at Bistro
                  Boss – your ultimate dining destination.
                </p>
                <div className='flex justify-center mb-12 lg:justify-start'>
                  <button className='btn mb-10 bg-white text-gray-900 py-2 px-6 rounded-full mt-6 hover:bg-gray-200 transition duration-300'>
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Feature;
