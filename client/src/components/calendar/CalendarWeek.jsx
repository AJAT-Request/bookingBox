import CalendarDay from './CalendarDay';

const React = require('react');
const PropTypes = require('prop-types');

function CalendarWeek(props) {
  const { week } = props;
  console.log('CURR WEEK', week);
  return (
    <tr>
      {week.map((date, index) => <CalendarDay key={index} date={date} />)}
    </tr>
  );
}

CalendarWeek.propTypes = {
  week: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ])).isRequired,
};

export default CalendarWeek;
