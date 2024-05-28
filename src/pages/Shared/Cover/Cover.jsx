import PropTypes from 'prop-types';
const Cover = ({ bgImage, text, shortDescription }) => {
  return (
    <div className='space-y-8'>
      <div className=''>
        <div
          className='hero w-full h-[455px]'
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundAttachment: 'fixed',
          }}
        >
          <div className='hero-overlay'></div>
          <div className='w-3/4 text-center '>
            <div className=' py-12 bg-[#15151599] text-white bg-opacity-65  p-6'>
              <h1 className='mb-5 text-5xl font-medium uppercase'>{text}</h1>
              <p className='mb-5 max-w-xl mx-auto'>{shortDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cover;
// props types
Cover.propTypes = {
  bgImage: PropTypes.string,
  shortDescription: PropTypes.string,
  text: PropTypes.string,
};
