import styles from '../styles/NightlyFee.css';

const React = require('react');
const PropTypes = require('prop-types');

function NightlyFee(props) {
  const { price } = props;
  return (
    <div>
      <strong className={styles.price}>
        $
        {price}
      </strong>
      <span className={styles.night}>per night</span>
    </div>
  );
}

NightlyFee.propTypes = {
  price: PropTypes.number.isRequired,
};

export default NightlyFee;
