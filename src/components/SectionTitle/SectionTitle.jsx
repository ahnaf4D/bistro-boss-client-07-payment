import PropTypes from 'prop-types';
const SectionTitle = ({ subheading, heading }) => {
  return (
    <div className='text-center my-4 border-y-2 mx-auto  py-4 md:w-3/12'>
      <h2 className='text-orange-300 italic text-2xl'>--- {subheading} ---</h2>
      <h1 className='uppercase text-3xl'>{heading}</h1>
    </div>
  );
};

export default SectionTitle;
// Prop types
SectionTitle.propTypes = {
  subheading: PropTypes.string,
  heading: PropTypes.string,
};
