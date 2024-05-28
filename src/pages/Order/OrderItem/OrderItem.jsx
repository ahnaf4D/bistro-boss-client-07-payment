import PropTypes from 'prop-types';
import FoodCard from '../../../components/FoodCard/FoodCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const OrderItem = ({ items }) => {
  const itemsPerPage = 6;
  const pages = Math.ceil(items.length / itemsPerPage);
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };
  return (
    <div>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className='mySwiper'
      >
        {Array.from({ length: pages }).map((_, pageIndex) => (
          <SwiperSlide key={pageIndex}>
            <div className='grid gap-6 my-12 container mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {items
                .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                .map((item) => (
                  <FoodCard key={item._id} food={item}></FoodCard>
                ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OrderItem;

// props types
OrderItem.propTypes = {
  items: PropTypes.array.isRequired,
};
