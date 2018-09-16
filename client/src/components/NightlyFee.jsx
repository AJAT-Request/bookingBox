const React = require('react');
const PropTypes = require('prop-types');

function NightlyFee(props) {
  const { price } = props;
  return (
    <div>
      {price}
       per night
    </div>
  );
}

NightlyFee.propTypes = {
  price: PropTypes.number.isRequired,
};

export default NightlyFee;
