const React = require('react');
const PropTypes = require('prop-types');

function Guests(props) {
  const { numGuests } = props;
  return (
    <div>
      {`Can have ${numGuests} guests for this booking`}
    </div>
  );
}

Guests.propTypes = {
  numGuests: PropTypes.number.isRequired,
};

export default Guests;
