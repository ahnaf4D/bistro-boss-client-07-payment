import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {
  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === 'popular');
  return (
    <div>
      <SectionTitle
        subheading={'Check it out'}
        heading={'FROM OUR MENU'}
      ></SectionTitle>
      <div className='grid  gap-4 container mx-auto my-8 grid-cols-1 md:grid-cols-2'>
        {popular.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className='mx-auto container text-center mb-6'>
        <button className='btn'>View Full Menu</button>
      </div>
    </div>
  );
};

export default PopularMenu;
