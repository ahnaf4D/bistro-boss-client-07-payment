import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Slide1 from '../../../assets/home/slide1.jpg';
import Slide2 from '../../../assets/home/slide2.jpg';
import Slide3 from '../../../assets/home/slide3.jpg';
import Slide4 from '../../../assets/home/slide4.jpg';
import Slide5 from '../../../assets/home/slide5.jpg';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
const Category = () => {
  return (
    <div className='my-12'>
      <SectionTitle
        subheading={'From 11:00am to 10:00pm'}
        heading={'ORDER ONLINE'}
      ></SectionTitle>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className='mySwiper'
      >
        <SwiperSlide>
          <img src={Slide1} />
          <h3 className='text-4xl uppercase text-center -mt-16 shadow-2xl text-white '>
            Salad
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Slide2} />
          <h3 className='text-4xl uppercase text-center -mt-16 shadow-2xl text-white '>
            Pizzas
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Slide3} />
          <h3 className='text-4xl uppercase text-center -mt-16 shadow-2xl text-white '>
            Soups
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Slide4} />
          <h3 className='text-4xl uppercase text-center -mt-16 shadow-2xl text-white '>
            Deserts
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Slide5} />
          <h3 className='text-4xl uppercase text-center -mt-16 shadow-2xl text-white '>
            Onion
          </h3>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Category;
