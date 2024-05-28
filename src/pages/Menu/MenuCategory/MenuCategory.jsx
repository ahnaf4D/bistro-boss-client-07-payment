import { Link } from 'react-router-dom';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import PropTypes from 'prop-types';

const MenuCategory = ({ items, category }) => {
  console.log(items);
  return (
    <div>
      <div className='grid  gap-4 container mx-auto my-8 grid-cols-1 md:grid-cols-2'>
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <Link to={`/order-food/${category}`} className='flex justify-center mb-4'>
        <button className='btn text-orange-400 bg-gray-700 hover:bg-slate-200 hover:text-black '>
          Order Now
        </button>
      </Link>
    </div>
  );
};

export default MenuCategory;
MenuCategory.propTypes = {
  items: PropTypes.array,
  category: PropTypes.string,
};
