const express = require('express');
const bodyParser = require('body-parser');
const keys = require('./config/api_keys');
const axios = require('axios');
const dbCon = require('./config/db_config').dbCon;
require('./services');
require('./routes');

const app = express();

let port = 5000 || process.env.PORT;

dbCon.connect((error) => {
  if (error) throw err;
});

app.get('/api/coins', (req, res) => {
  dbCon.query('SELECT * FROM coins', function (error, result) {
    if (error) throw error;
    res.send(result);
  });
})

// Get the exchange rate between a real currency and a cryptocurrency
app.get('/api/exchangerate', (req, res) => {
  const crypto = req.query.crypto;
  const currency = req.query.currency;

  if (crypto && currency) {
  axios.get(`https://rest.coinapi.io/v1/exchangerate/${crypto}/${currency}?apikey=${keys.coin_api}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }
});

app.get('/api/coins/historical', (req, res) => {
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate()-1);
  yesterday = yesterday.toISOString();

  axios.get(`https://rest.coinapi.io/v1/exchangerate/BTC/USD?time=${yesterday}&apikey=${keys.coin_api}`)
    .then((response) => {
      return res.send(response.data);
    })
    .catch((error) => {
      //console.log(error);
    })
});

var starttime = new Date();
// Get the iso time (GMT 0 == UTC 0)
var isotime = new Date((new Date(starttime)).toISOString() );
// getTime() is the unix time value, in milliseconds.
// getTimezoneOffset() is UTC time and local time in minutes.
// 60000 = 60*1000 converts getTimezoneOffset() from minutes to milliseconds.
var fixedtime = new Date(isotime.getTime()-(starttime.getTimezoneOffset()*60000));
// toISOString() is always 24 characters long: YYYY-MM-DDTHH:mm:ss.sssZ.
// .slice(0, 19) removes the last 5 chars, ".sssZ",which is (UTC offset).
// .replace('T', ' ') removes the pad between the date and time.
var formatedMysqlString = fixedtime.toISOString().slice(0, 19).replace('T', ' ');
console.log( formatedMysqlString );

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});