const React = require('react');
const ReactDOM = require('react-dom');

class BookingBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>We rendered!!!</div>
    );
  }
}

ReactDOM.render(<BookingBox />, document.getElementById('App'));
