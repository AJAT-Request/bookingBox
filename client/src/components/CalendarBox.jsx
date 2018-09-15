const React = require('react');
const PropTypes = require('prop-types');
const $ = require('jquery');

class CalendarBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: [],
    };
  }

  componentDidMount() {
    this.getDates();
  }

  getDates() {
    const currMonth = new Date().getMonth();
    $.ajax({
      url: './dates',
      data: { month: currMonth },
      success: (result) => {
        console.log('RESULT WAS', result);
        this.setState({
          dates: result,
        });
      },
      error: (error) => {
        console.error('ERROR IN AJAX GET:', error);
      },
    });
  }

  render() {
    const { dates } = this.state;
    const { func } = this.props;
    return (
      <ul>
        {dates.map(date => <div>{date.day}</div>)}
        <button type="submit" onClick={() => func(5)}>Set dates!</button>
      </ul>
    );
  }
}

CalendarBox.propTypes = {
  func: PropTypes.func.isRequired,
};

export default CalendarBox;
