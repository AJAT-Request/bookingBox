const React = require('react');
const $ = require('jquery');

class BookingBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getData() {
    let something = this;
    $.ajax({
      url: './info',
      success: (result) => {
        console.log('RESULT WAS', result);
      },
      error: (error) => {
        console.error('ERROR IN AJAX GET:', error);
      },
    });
  }

  getDates() {
    let something = this;
    const currMonth = new Date().getMonth();
    $.ajax({
      url: './dates',
      data: { month: currMonth },
      success: (result) => {
        console.log('RESULT WAS', result);
      },
      error: (error) => {
        console.error('ERROR IN AJAX GET:', error);
      },
    });
  }

  render() {
    return (
      <div>
        We rendered!!!
        <button type="submit" onClick={this.getData}>Get listing info!</button>
        <button type="submit" onClick={this.getDates}>Get dates!</button>
      </div>
    );
  }
}

export default BookingBox;
