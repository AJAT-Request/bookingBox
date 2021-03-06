import CalendarWeek from './CalendarWeek';
import styles from '../../styles/Calendar.css';

const React = require('react');
const PropTypes = require('prop-types');

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weeks: [],
    };
  }

  componentDidMount() {
    this.formatWeeks();
  }

  componentDidUpdate(prevProps) {
    const { month } = this.props;
    if (month !== prevProps.month) {
      this.formatWeeks();
    }
  }

  formatWeeks() {
    const {
      month, year,
    } = this.props;
    // get days in current month
    const daysInCurrMonth = new Date(year, month + 1, 0).getDate();
    const formattedWeeks = [];
    const monthStart = new Date(year, month);
    let currWeek = [];

    // Make filler days before start of month
    for (let i = 0; i < monthStart.getDay(); i += 1) {
      currWeek.push(false);
    }
    for (let i = 1; i <= daysInCurrMonth; i += 1) {
      currWeek.push(this.makeDay(i));
      if (currWeek.length === 7) {
        formattedWeeks.push(currWeek);
        currWeek = [];
      }
    }
    while (currWeek.length < 7) {
      currWeek.push(false);
    }
    formattedWeeks.push(currWeek);

    this.setState({
      weeks: formattedWeeks,
    });
  }

  makeDay(day) {
    const { dates, month, year } = this.props;
    let available = 0;
    if (dates) {
      if (dates[day]) {
        if (dates[day].available) {
          available = 1;
        }
      }
    }
    return {
      available,
      day,
      month,
      year,
    };
  }

  render() {
    const { weeks } = this.state;
    // const { func } = this.props;
    return (
      <table className={styles.table}>
        <tbody>
          {weeks.map((week, index) => <CalendarWeek key={index} week={week} />)}
        </tbody>
      </table>
    );
  }
}

Calendar.propTypes = {
  dates: PropTypes.shape({}),
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  // setDate: PropTypes.func.isRequired,
};

Calendar.defaultProps = {
  dates: undefined,
};

export default Calendar;
