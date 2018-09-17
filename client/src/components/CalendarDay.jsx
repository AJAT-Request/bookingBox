import styles from '../styles/BookingBox.css';

const React = require('react');
const PropTypes = require('prop-types');

function CalendarDay(props) {
  const { date } = props;
  if (date) {
    return <td className={styles.container}>{date.day}</td>;
  }
  return (
    <td />
  );
}

CalendarDay.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.shape({
      day: PropTypes.number.isRequired,
    }),
    PropTypes.bool,
  ]).isRequired,
};

export default CalendarDay;
