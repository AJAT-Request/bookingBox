import styles from '../styles/BookButton.css';

const React = require('react');

function BookButton() {
  return (
    <div>
      <button type="submit" className={styles.book}>Request to Book</button>
      <div className={styles.disclaimer}>
        {'You wont be charged yet'}
      </div>
    </div>
  );
}

export default BookButton;
