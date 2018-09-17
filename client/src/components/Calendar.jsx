import CalendarWeek from './CalendarWeek';

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
    const { dates } = this.props;
    if (dates !== prevProps.dates) {
      this.formatWeeks();
    }
  }

  formatWeeks() {
    const {
      dates, month, year,
    } = this.props;
    const formattedWeeks = [];
    const monthStart = new Date(year, month);
    let currWeek = [];

    // Make filler days before start of month
    for (let i = 0; i < monthStart.getDay(); i += 1) {
      currWeek.push(false);
    }
    if (dates.length) {
      for (let i = 1; i < dates[0].day; i += 1) {
        currWeek.push(this.makeUnavailableDay(i));
        if (currWeek.length === 7) {
          formattedWeeks.push(currWeek);
          currWeek = [];
        }
      }
      for (let i = 0; i < dates.length; i += 1) {
        currWeek.push(dates[i]);
        if (currWeek.length === 7) {
          formattedWeeks.push(currWeek);
          currWeek = [];
        }
      }
      formattedWeeks.push(currWeek);
    }
    this.setState({
      weeks: formattedWeeks,
    });
  }

  makeUnavailableDay(day) {
    const { month, year } = this.props;
    return {
      available: 0,
      day,
      month,
      year,
    };
  }

  render() {
    const { weeks } = this.state;
    // const { func } = this.props;
    return (
      <table>
        <tbody>
          {weeks.map(week => <CalendarWeek week={week} />)}
        </tbody>
      </table>
    );
  }
}

Calendar.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.object).isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  // setDate: PropTypes.func.isRequired,
};

export default Calendar;
