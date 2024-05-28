import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `https://bistro-server154.vercel.app/reviews`
      );
      setReviews(data);
    };
    getData();
  }, []);
  return (
    <div>
      <SectionTitle
        heading={'TESTIMONIALS'}
        subheading={'What Our Clients Say'}
      ></SectionTitle>
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        className='mySwiper mx-auto container'
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className='text-center m-8 mx-auto max-w-md'>
              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                className='mx-auto my-6'
                readOnly
              />
              <FaQuoteLeft className='text-6xl text-center mx-auto my-6' />
              <p>{review.details}</p>
              <h1 className='text-3xl text-orange-400 font-medium'>
                {review.name}
              </h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
