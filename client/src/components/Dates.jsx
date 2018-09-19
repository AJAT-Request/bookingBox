import CalendarBox from './calendar/CalendarBox';
import styles from '../styles/Dates.css';

const React = require('react');
const PropTypes = require('prop-types');

class Dates extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderCalendar: false,
    };
  }

  toggleCalendar() {
    const { renderCalendar } = this.state;
    this.setState({
      renderCalendar: !renderCalendar,
    });
  }

  render() {
    const { setNumDays } = this.props;
    const { renderCalendar } = this.state;
    const calendarCreate = (
      <div>
        <div className={styles.title}>Dates</div>
        <div className={styles.container}>
          <div className={styles.content}>
            <button
              type="submit"
              onClick={this.toggleCalendar.bind(this)}
              className={styles.checkIn}
            >
              Check in
            </button>
            <span>{'>'}</span>
            <button
              type="submit"
              onClick={this.toggleCalendar.bind(this)}
              className={styles.checkOut}
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    );

    if (renderCalendar) {
      return (
        <div>
          {calendarCreate}
          <CalendarBox setNumDays={setNumDays} />
        </div>
      );
    }
    return (calendarCreate);
  }
}

Dates.propTypes = {
  setNumDays: PropTypes.func.isRequired,
};

export default Dates;
