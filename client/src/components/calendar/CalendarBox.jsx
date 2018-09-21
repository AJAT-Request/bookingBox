import React from 'react';
import Calendar from './Calendar';
import styles from '../../styles/CalendarBox.css';
// const React = require('react');
const PropTypes = require('prop-types');
const axios = require('axios');

class CalendarBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      datesInMonths: {},
      currMonth: new Date().getMonth(),
      currYear: new Date().getFullYear(),
      render: false,
      // checkInDate: {
      //   monthString: null,
      //   index: null,
      // },
      // checkOutDate: null,
      // currCalendar: null,
      monthsInYear: {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December',
      },
    };

    // this.setDate = this.setDate.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
  }

  componentDidMount() {
    const { currMonth, currYear } = this.state;
    this.getDates(currMonth, currYear);
    const nextDate = new Date(currYear, currMonth + 1);
    this.getDates(nextDate.getMonth(), nextDate.getFullYear());
  }

  getDates(month, year) {
    axios.get('/bookingBox/dates', {
      params: {
        month,
        year,
      },
    }).then((response) => {
      this.addDates(response.data, month, year);
    }).catch((error) => {
      console.log('ERROR IN AXIOS GET: ', error);
    });
  }

  // setDate(index) {
  //   const placeholder = this;
  //   console.log('Index clicked:', index);
  // }

  addDates(result, month, year) {
    const {
      datesInMonths, monthsInYear, currMonth, currYear,
    } = this.state;

    const datesObj = {};
    if (result) {
      for (let i = 0; i < result.length; i += 1) {
        datesObj[result[i].day] = result[i];
      }
    }

    const monthString = monthsInYear[month] + year;
    datesInMonths[monthString] = datesObj;
    if (month === currMonth && year === currYear) {
      this.setState({
        currMonthDates: datesObj,
        datesInMonths,
        render: true,
      });
    } else {
      this.setState({
        datesInMonths,
      });
    }
  }

  nextMonth() {
    const {
      monthsInYear, currMonth, currYear, datesInMonths,
    } = this.state;
    const nextDate = new Date(currYear, currMonth + 1);
    const nextMonthString = monthsInYear[nextDate.getMonth()] + nextDate.getFullYear();

    this.setState({
      currMonthDates: datesInMonths[nextMonthString],
      currMonth: nextDate.getMonth(),
      currYear: nextDate.getFullYear(),
    }, () => {
      // Gets the next month if it wasn't already gotten
      const monthAfter = new Date(nextDate.getFullYear(), nextDate.getMonth() + 1);
      const monthAfterString = monthsInYear[monthAfter.getMonth()] + monthAfter.getFullYear();
      if (datesInMonths[monthAfterString] === undefined) {
        this.getDates(monthAfter.getMonth(), monthAfter.getFullYear());
      }
    });
  }

  prevMonth() {
    const {
      monthsInYear, currMonth, currYear, datesInMonths,
    } = this.state;
    const nextDate = new Date(currYear, currMonth - 1);
    const nextMonthString = monthsInYear[nextDate.getMonth()] + nextDate.getFullYear();

    this.setState({
      currMonthDates: datesInMonths[nextMonthString],
      currMonth: nextDate.getMonth(),
      currYear: nextDate.getFullYear(),
    });
  }

  render() {
    const {
      render, currMonthDates, currMonth, currYear, monthsInYear,
    } = this.state;

    const dayTitles = [
      'Su',
      'Mo',
      'Tu',
      'We',
      'Th',
      'Fr',
      'Sa',
    ];

    if (render) {
      return (
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.titleBox}>
              <button
                type="submit"
                onClick={this.prevMonth}
                className={styles.prev}
              >
                {'<'}
              </button>
              <span className={styles.monthTitle}>
                {`${monthsInYear[currMonth]} ${currYear}`}
              </span>
              <button
                type="submit"
                onClick={this.nextMonth}
                className={styles.next}
              >
                {'>'}
              </button>
            </div>
            <table className={styles.dayTitle}>
              <tbody>
                <tr>
                  {dayTitles.map(day => <td key={day}>{day}</td>)}
                </tr>
              </tbody>
            </table>
            <Calendar
              dates={currMonthDates}
              month={currMonth}
              year={currYear}
              monthsInYear={monthsInYear}
              setDate={this.setDate}
            />
          </div>
        </div>
      );
    }
    return null;
  }
}

CalendarBox.propTypes = {
  setNumDays: PropTypes.func.isRequired,
};

export default CalendarBox;
