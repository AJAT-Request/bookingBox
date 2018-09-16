const React = require('react');
const PropTypes = require('prop-types');

function Reviews(props) {
  const { rating, num } = props;
  return (
    <div>
      {rating}
       average rating over:
      {num}
       reviews
    </div>
  );
}

Reviews.propTypes = {
  rating: PropTypes.number.isRequired,
  num: PropTypes.number.isRequired,
};

export default Reviews;
