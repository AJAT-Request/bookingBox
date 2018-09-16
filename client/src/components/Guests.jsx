const React = require('react');
const PropTypes = require('prop-types');

function Guests(props) {
  const { numGuests } = props;
  return (
    <div>
      Can have
      {numGuests}
       guests
    </div>
  );
}

Guests.propTypes = {
  numGuests: PropTypes.number.isRequired,
};

export default Guests;
