import { Helmet } from 'react-helmet-async';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import ChefRecommendation from '../ChefRecomendation/ChefRecomendation';
import ContactNumber from '../ContactNumber/ContactNumber';
import Feature from '../Feature/Feature';
import OurQuote from '../OurQuote/OurQuote';
import PopularMenu from '../PopularMenu/PopularMenu';
import Testimonial from '../Testimonial/Testimonial';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss - Home</title>
      </Helmet>
      <Banner></Banner>
      <Category></Category>
      <OurQuote></OurQuote>
      <PopularMenu></PopularMenu>
      <ContactNumber></ContactNumber>
      <ChefRecommendation></ChefRecommendation>
      <Feature></Feature>
      <Testimonial></Testimonial>
    </div>
  );
};

export default Home;
