import { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import axios from 'axios';
import RecomendationCard from '../RecomendationCard/RecomendationCard';

const ChefRecommendation = () => {
  const [recomendation, setRecomendation] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('./recomendation.json');
      setRecomendation(data);
    };
    getData();
  }, []);
  return (
    <div>
      <SectionTitle
        heading={'CHEF RECOMMENDS'}
        subheading={'Should Try'}
      ></SectionTitle>
      <div className='flex gap-4 items-center justify-center my-12 flex-col lg:flex-row'>
        {recomendation.map((recomendedFood, idx) => (
          <RecomendationCard
            key={idx}
            recomendedFood={recomendedFood}
          ></RecomendationCard>
        ))}
      </div>
    </div>
  );
};

export default ChefRecommendation;
