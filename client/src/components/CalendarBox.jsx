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
      render: false,
      // checkInDate: null,
      // checkOutDate: null,
      // currCalendar: null,
    };

    // this.setDate = this.setDate.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
  }

  componentDidMount() {
    // const { currMonth, currYear } = this.state;
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

  // setDate(index) {
  //   const placeholder = this;
  //   console.log('Index clicked:', index);
  // }

  appendToDates(result) {
    const { dates, currMonthStartIndex, currMonthEndIndex } = this.state;
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
    }, () => this.getDates());
  }

  prevMonth() {
    const { currMonth, currYear } = this.state;
    const nextDate = new Date(currYear, currMonth - 1);
    this.setState({
      currMonth: nextDate.getMonth(),
      currYear: nextDate.getFullYear(),
    });
  }

  render() {
    const {
      render, currMonthDates, currMonth, currYear,
    } = this.state;

    if (render) {
      return (
        <div>
          <button type="submit" onClick={this.nextMonth}>Next month</button>
          <Calendar
            dates={currMonthDates}
            month={currMonth}
            year={currYear}
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
