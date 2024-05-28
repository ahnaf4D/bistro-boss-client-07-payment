import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import BannerImage from '../../../assets/menu/banner3.jpg';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';
import DessertBg from '../../../assets/menu/dessert-bg.jpeg';
import PizzaBg from '../../../assets/menu/pizza-bg.jpg';
import SaladBg from '../../../assets/menu/salad-bg.jpg';
import SoupBg from '../../../assets/menu/soup-bg.jpg';

const Menu = () => {
  const [menu] = useMenu();
  const todayOffers = menu.filter((item) => item.category === 'offered');
  const desserts = menu.filter((item) => item.category === 'dessert');
  const pizzas = menu.filter((item) => item.category === 'pizza');
  const salads = menu.filter((item) => item.category === 'salad');
  const soups = menu.filter((item) => item.category === 'soup');

  return (
    <div>
      <Helmet>
        <title>Bistro Boss - Menu</title>
      </Helmet>
      <Cover
        bgImage={BannerImage}
        text={'Our Menus'}
        shortDescription='Would you like to try a dish?'
      ></Cover>
      <SectionTitle
        heading={"TODAY'S OFFER"}
        subheading={"Don't miss"}
      ></SectionTitle>
      <MenuCategory items={todayOffers}></MenuCategory>
      {/* Desert Cover */}
      <Cover
        bgImage={DessertBg}
        text={'Desserts'}
        shortDescription='Indulge in our exquisite desserts, from rich Chocolate Lava Cake to creamy New York Cheesecake, each crafted to perfection, ensuring a sweet and memorable end to your dining experience.'
      ></Cover>
      {/* Pizza */}
      <MenuCategory items={desserts}></MenuCategory>
      <Cover
        bgImage={PizzaBg}
        text={'PIZZA'}
        shortDescription='Enjoy our artisan pizzas, crafted with fresh ingredients and baked to perfection. From classic Margherita to gourmet specialties, each bite promises a burst of authentic flavor.'
      ></Cover>
      <MenuCategory items={pizzas}></MenuCategory>
      {/* Salad */}
      <Cover
        bgImage={SaladBg}
        text={'SAlAd'}
        shortDescription='Enjoy our fresh, vibrant salads, crafted with crisp greens, seasonal vegetables, and house-made dressings, offering a perfect, healthy start or refreshing complement to your meal.'
      ></Cover>
      <MenuCategory items={salads}></MenuCategory>
      {/* Soups */}
      <Cover
        bgImage={SoupBg}
        text={'SOUPS'}
        shortDescription='Savor our delightful soups, from the comforting Classic Chicken Noodle to the rich and creamy Tomato Basil, each made with fresh ingredients to warm your soul and palate.'
      ></Cover>
      <MenuCategory items={soups}></MenuCategory>
    </div>
  );
};

export default Menu;
