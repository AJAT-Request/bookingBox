const React = require('react');
const PropTypes = require('prop-types');

function SumTotals(props) {
  const {
    nightlyFee, cleaningFee, serviceFee, days, render,
  } = props;
  if (render) {
    return (
      <div>
        <div>
          Nightly Fee:
          {nightlyFee}
        </div>
        <div>
          Cleaning Fee:
          {cleaningFee}
        </div>
        <div>
          Service Fee:
          {serviceFee}
        </div>
        <div>
          Days:
          {days}
        </div>
      </div>
    );
  }
  return null;
}

SumTotals.propTypes = {
  nightlyFee: PropTypes.number.isRequired,
  cleaningFee: PropTypes.number.isRequired,
  serviceFee: PropTypes.number.isRequired,
  days: PropTypes.number.isRequired,
  render: PropTypes.bool.isRequired,
};

export default SumTotals;
