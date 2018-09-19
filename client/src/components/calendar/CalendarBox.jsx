import React from 'react';
import Calendar from './Calendar';
// const React = require('react');
const PropTypes = require('prop-types');
const $ = require('jquery'); // Switch to axios at some point

class CalendarBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: [],
      currMonthStartIndex: null,
      currMonthEndIndex: null,
      currMonthDates: [],
      currMonth: new Date().getMonth(),
      currYear: new Date().getFullYear(),
      // daysInCurrMonth: null,
      render: false,
      // checkInDate: null,
      // checkOutDate: null,
      // currCalendar: null,
      months: {
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
    // const { currMonth, currYear } = this.state;
    // this.setDaysInMonth(currMonth, currYear);
    // this.getDates(currMonth, currYear);
    this.getDates();
  }

  getDates() {
    const { currMonth, currYear } = this.state;
    $.ajax({
      url: './dates',
      data: { month: currMonth, year: currYear },
      success: (result) => {
        this.appendToDates(result);
      },
      error: (error) => {
        console.error('ERROR IN AJAX GET:', error);
      },
    });
  }

  // setDaysInMonth(month, year) {
  //   const numDaysInMonth = new Date(year, month + 1, 0).getDate();
  //   this.setState({
  //     daysInCurrMonth: numDaysInMonth,
  //   });
  // }

  // setDate(index) {
  //   const placeholder = this;
  //   console.log('Index clicked:', index);
  // }

  appendToDates(result) {
    const {
      dates, currMonthStartIndex, currMonthEndIndex,
    } = this.state;
    if (currMonthStartIndex === null) {
      const datesToAdd = [];
      const today = new Date();
      result.forEach((date) => {
        if (date.day > today.getDate()) {
          datesToAdd.push(date);
        }
      });
      this.setState({
        currMonthStartIndex: 0,
        currMonthEndIndex: result.length - 1,
        dates: datesToAdd,
        currMonthDates: datesToAdd,
        render: true,
      });
    } else {
      const datesToAdd = [];
      result.forEach((date) => {
        datesToAdd.push(date);
        dates.push(date);
      });
      this.setState({
        currMonthStartIndex: currMonthEndIndex + 1,
        currMonthEndIndex: currMonthEndIndex + 1 + result.length,
        dates,
        currMonthDates: datesToAdd,
        render: true,
      });
    }
  }

  nextMonth() {
    const { currMonth, currYear } = this.state;
    const nextDate = new Date(currYear, currMonth + 1);
    this.setState({
      currMonth: nextDate.getMonth(),
      currYear: nextDate.getFullYear(),
    }, () => {
      const { dates, currMonthEndIndex } = this.state;
      if (!dates[currMonthEndIndex + 1]) {
        this.getDates();
      } else {
        const daysInCurrMonth = new Date(
          nextDate.getFullYear(),
          nextDate.getMonth() + 1,
          0,
        ).getDate();

        if (!dates[currMonthEndIndex + daysInCurrMonth]) {
          const newDates = [];
          for (let i = currMonthEndIndex + 1; i < dates.length - 1; i += 1) {
            newDates.push(dates[i]);
          }
          this.setState({
            currMonthDates: newDates,
            currMonthStartIndex: currMonthEndIndex + 1,
            currMonthEndIndex: dates.length - 1,
          });
        } else {
          const newDates = [];
          for (let i = currMonthEndIndex + 1; i < currMonthEndIndex + daysInCurrMonth; i += 1) {
            newDates.push(dates[i]);
          }
          this.setState({
            currMonthDates: newDates,
            currMonthStartIndex: currMonthEndIndex + 1,
            currMonthEndIndex: currMonthEndIndex + daysInCurrMonth,
          });
        }
      }
    });
  }

  prevMonth() {
    const { currMonth, currYear } = this.state;
    const nextDate = new Date(currYear, currMonth - 1);
    this.setState({
      currMonth: nextDate.getMonth(),
      currYear: nextDate.getFullYear(),
    }, () => {
      const { dates, currMonthStartIndex } = this.state;
      const daysInCurrMonth = new Date(
        nextDate.getFullYear(),
        nextDate.getMonth() + 1,
        0,
      ).getDate();

      if (!dates[currMonthStartIndex - daysInCurrMonth]) {
        const newDates = [];
        for (let i = 0; i < currMonthStartIndex - 1; i += 1) {
          newDates.push(dates[i]);
        }
        this.setState({
          currMonthDates: newDates,
          currMonthStartIndex: 0,
          currMonthEndIndex: currMonthStartIndex - 1,
        });
      } else {
        const newDates = [];
        for (let i = currMonthStartIndex - daysInCurrMonth; i < currMonthStartIndex - 1; i += 1) {
          newDates.push(dates[i]);
        }
        this.setState({
          currMonthDates: newDates,
          currMonthStartIndex: currMonthStartIndex - daysInCurrMonth,
          currMonthEndIndex: currMonthStartIndex - 1,
        });
      }
    });
  }

  render() {
    const {
      render, currMonthDates, currMonth, currYear, months,
    } = this.state;

    if (render) {
      return (
        <div>
          <button type="submit" onClick={this.prevMonth}>Previous month</button>
          <button type="submit" onClick={this.nextMonth}>Next month</button>
          <Calendar
            dates={currMonthDates}
            month={currMonth}
            year={currYear}
            months={months}
            setDate={this.setDate}
          />
        </div>
      );
    }
    return <div>Could not find dates!</div>;
  }
}

CalendarBox.propTypes = {
  setNumDays: PropTypes.func.isRequired,
};

export default CalendarBox;
