const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Pass_word2%',
  database: 'bookingbox',
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected');
});

module.exports = connection;
