import PropTypes from 'prop-types';
const MenuItem = ({ item }) => {
  const { name, image, price, recipe } = item;
  return (
    <div className='flex items-center gap-6'>
      <img
        src={image}
        alt=''
        className='size-24 rounded-xl'
        style={{ borderRadius: '0px 200px 200px' }}
      />
      <div>
        <h2 className='font-semibold'>
          {name} ------ <span className='text-orange-500'>${price}</span>
        </h2>
        <p>{recipe}</p>
      </div>
    </div>
  );
};

export default MenuItem;
// prop types
MenuItem.propTypes = {
  item: PropTypes.object,
};
