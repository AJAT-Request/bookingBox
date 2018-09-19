import styles from '../../styles/CalendarDay.css';

const React = require('react');
const PropTypes = require('prop-types');

function CalendarDay(props) {
  const { date } = props;
  if (date) {
    if (date.available) {
      return <td className={[styles.container, styles.available].join(' ')}>{date.day}</td>;
    }
    return <td className={[styles.container, styles.unavailable].join(' ')}>{date.day}</td>;
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
