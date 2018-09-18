const express = require('express');
const bodyParser = require('body-parser');
const keys = require('./config/api_keys');
const axios = require('axios');
const dbCon = require('./config/db_config').dbCon;
const cors = require('cors');
require('./services');
require('./routes');

const app = express();

let port = 5000 || process.env.PORT;

app.use(cors());

dbCon.connect((error) => {
  if (error) throw err;
});

app.get('/api/coins', (req, res) => {
  dbCon.query('SELECT * FROM coins', function (error, result) {
    if (error) throw error;
    res.send(result);
  });
})

app.get('/api/hindsight', (req,res) => {
  const base = 'BTC';
  const quote = 'USD';
  const time = '2012-01-01T00:00:00Z';

  axios.get(`https://rest.coinapi.io/v1/exchangerate/${base}/${quote}?time=${time}&apikey=${keys.coin_api}`)
    .then((response) => {
      return res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
      return res.send(error);
    })
});

// Get the exchange rate between a real currency and a cryptocurrency
app.get('/api/exchangerate', (req, res) => {
  const base = req.query.base;

  axios.get(`https://rest.coinapi.io/v1/exchangerate/${base}?apikey=${keys.coin_api}`)
  .then((response) => {
    return res.send(response.data);
  })
  .catch((error) => {
    console.log(error);
    return res.send(error);
  })
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
      console.log(error);
      return res.send(error);
    })
});

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});