const RecomendationCard = ({ recomendedFood }) => {
  return (
    <div>
      <div className='card card-compact  w-96 bg-gray-200 p-4 shadow'>
        <figure>
          <img
            src={recomendedFood.food_image}
            alt='Shoes'
            width={275}
            height={183}
          />
        </figure>
        <div className='card-body text-center'>
          <h2 className='card-title text-center mx-auto'>
            {recomendedFood.food_title}
          </h2>
          <p>{recomendedFood.short_description}</p>
          <div className='card-actions justify-center '>
            <button className='btn text-orange-400 bg-gray-700 hover:bg-slate-200 hover:text-black'>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecomendationCard;
