const express = require('express');
const morgan = require('morgan');
const path = require('path');
// const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();
const port = process.env.PORT || 3002;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/dist')));

let currRoom = null;

app.get('/rooms/info', (req, res) => {
  currRoom = Number(req.query.roomId) + 1;
  db.query(`SELECT * FROM listing WHERE listingId = ${currRoom}`, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
});

app.get('/rooms/dates', (req, res) => {
  db.query(`SELECT * FROM dates WHERE listingId = ${currRoom} AND month = ${req.query.month} AND year = ${req.query.year}`, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).send(result);
  });
});

app.get('/rooms/:roomId', (req, res) => {
  // currRoom = Number(req.params.roomId) + 1;
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}!`);
});
