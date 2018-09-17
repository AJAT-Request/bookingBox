import CalendarBox from './CalendarBox';

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
    if (renderCalendar) {
      return (
        <div>
          <button type="submit" onClick={this.toggleCalendar.bind(this)}>Calendar!!</button>
          <CalendarBox setNumDays={setNumDays} />
        </div>
      );
    }
    return (
      <div>
        <button type="submit" onClick={this.toggleCalendar.bind(this)}>Calendar!!</button>
      </div>
    );
  }
}

Dates.propTypes = {
  setNumDays: PropTypes.func.isRequired,
};

export default Dates;
