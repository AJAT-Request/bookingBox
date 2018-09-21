import styles from '../styles/Reviews.css';

const React = require('react');
const PropTypes = require('prop-types');

function Reviews(props) {
  const { rating, num } = props;

  const stars = [];
  for (let i = 0; i < 5; i += 1) {
    stars.push(i);
  }

  return (
    <div>
      {stars.map(key => (
        <img
          key={key}
          className={styles.star}
          src="https://s3-us-west-1.amazonaws.com/booking-box/star.png"
          alt="*"
        />
      ))}
      <span className={styles.num}>{num}</span>
    </div>
  );
}

Reviews.propTypes = {
  rating: PropTypes.number.isRequired,
  num: PropTypes.number.isRequired,
};

export default Reviews;
