import NightlyFee from './NightlyFee';
import Reviews from './Reviews';
import Dates from './Dates';
import Guests from './Guests';
import SumTotals from './SumTotals';

const React = require('react');
const $ = require('jquery');

class BookingBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nightlyFee: null,
      serviceFee: null,
      cleaningFee: null,
      numReviews: null,
      reviewRating: null,
      numGuests: null,
      daysBooking: 0,
      render: false,
    };

    this.changeDays = this.changeDays.bind(this);
  }
  // (listingName, nightlyFee, serviceFee, cleaningFee, numReviews,
  // reviewRating, numGuests, timesRecentlyViewed)

  componentDidMount() {
    $.ajax({
      url: './info',
      success: (result) => {
        this.setState({
          nightlyFee: result[0].nightlyFee,
          serviceFee: result[0].serviceFee,
          cleaningFee: result[0].cleaningFee,
          numReviews: result[0].numReviews,
          reviewRating: result[0].reviewRating,
          numGuests: result[0].numGuests,
        });
      },
      error: (error) => {
        console.error('ERROR IN AJAX GET:', error);
      },
    });
  }

  toggleTotals() {
    const { render } = this.state;
    this.setState({
      render: !render,
    });
  }

  changeDays(number) {
    // Use this function inside the calendar
    console.log('DAY CHANGED', number);
    this.setState({
      daysBooking: number,
    });
  }

  render() {
    const { nightlyFee, serviceFee, cleaningFee, numReviews,
      reviewRating, numGuests, daysBooking, render } = this.state;
    if (!nightlyFee) {
      return <div>Could not find room!</div>;
    }
    return (
      <div>
        <NightlyFee price={nightlyFee} />
        <Reviews rating={reviewRating} num={numReviews} />
        <div>Make a styled div here to make a line</div>
        <hr />
        <Dates func={this.changeDays} />
        <Guests numGuests={numGuests} />
        <SumTotals
          nightlyFee={nightlyFee}
          serviceFee={serviceFee}
          cleaningFee={cleaningFee}
          days={daysBooking}
          render={render}
        />
        <button type="submit" onClick={this.toggleTotals.bind(this)}>Render Totals!</button>
        <button type="submit" onClick={this.getDates}>Get dates!</button>
      </div>
    );
  }

}

export default BookingBox;
