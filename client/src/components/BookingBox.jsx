import NightlyFee from './NightlyFee';
import Reviews from './Reviews';
import Dates from './Dates';
import Guests from './Guests';
import SumTotals from './SumTotals';
import BookButton from './BookButton';
import styles from '../styles/BookingBox.css';

const React = require('react');
const axios = require('axios');

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

    this.setNumDays = this.setNumDays.bind(this);
  }
  // (listingName, nightlyFee, serviceFee, cleaningFee, numReviews,
  // reviewRating, numGuests, timesRecentlyViewed)

  componentDidMount() {
    axios.get('/bookingBox/info', {
      params: {
        roomId: window.location.pathname.slice(7),
      },
    }).then((response) => {
      const result = response.data;
      this.setState({
        nightlyFee: result[0].nightlyFee,
        serviceFee: result[0].serviceFee,
        cleaningFee: result[0].cleaningFee,
        numReviews: result[0].numReviews,
        reviewRating: result[0].reviewRating,
        numGuests: result[0].numGuests,
      });
    }).catch((error) => {
      console.log('ERROR IN AXIOS GET: ', error);
    });
  }

  setNumDays(number) {
    // Use this function inside the calendar
    console.log('DAY CHANGED', number);
    this.setState({
      daysBooking: number,
    });
  }

  toggleTotals() {
    const { render } = this.state;
    this.setState({
      render: !render,
    });
  }

  render() {
    const {
      nightlyFee, serviceFee, cleaningFee, numReviews, reviewRating, numGuests, daysBooking, render,
    } = this.state;
    if (!nightlyFee) {
      return <div>Could not find room!</div>;
    }
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <NightlyFee price={nightlyFee} />
          <Reviews rating={reviewRating} num={numReviews} />
          <div className={styles.line} />
          <Dates setNumDays={this.setNumDays} />
          <div className={styles.line} />
          <Guests numGuests={numGuests} />
          <SumTotals
            nightlyFee={nightlyFee}
            serviceFee={serviceFee}
            cleaningFee={cleaningFee}
            days={daysBooking}
            render={render}
          />
          <BookButton />
          <div className={styles.line} />
          <button type="submit" onClick={this.toggleTotals.bind(this)}>Render Totals!</button>
        </div>
      </div>
    );
  }
}

export default BookingBox;
