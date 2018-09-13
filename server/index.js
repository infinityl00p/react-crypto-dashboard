const express = require('express');
const bodyParser = require('body-parser');
const keys = require('./api_keys');
const axios = require('axios');
const dbCon = require('./db_config').dbCon;

const app = express();


let port = 5000 || process.env.PORT

dbCon.connect((error) => {
  if (error) throw err;
  console.log("Database Connected!");
  dbCon.query('SELECT * FROM exchange_rates', function (err, result) {
    if (err) throw err;
    console.log(result[0]);
  });
});

// Get the exchange rate between a real currency and a cryptocurrency
app.get('/api/exchangerate', (req, res) => {
  const crypto = req.query.crypto;
  const currency = req.query.currency;

  if (crypto && currency) {
  axios.get(`https://rest.coinapi.io/v1/exchangerate/${crypto}/${currency}?apikey=${keys.coinApi}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }
});

const getAllCoinsInUSD = () => {
  const cryptoCoins = ['BTC', 'ETH', 'XRB', 'BCH', 'LTC', 'EOS'];
  const cryptoCurrencyValues = [];

  cryptoCoins.forEach((coin) => {
    axios.get(`https://rest.coinapi.io/v1/exchangerate/${coin}/USD?apikey=${keys.coinApi}`)
    .then((response) => {
      const base = response.data.asset_id_base;
      const quote = response.data.asset_id_quote;
      const rate = response.data.rate;
      const time = response.data.time;


      const queryString = `INSERT INTO exchange_rates (base, quote, rate, time) VALUES (?, ?, ?, ?)`;

      dbCon.connect((error) => {
        dbCon.query(queryString, [base, quote, rate, time], function (err, result) {
          console.log({result});
        });
      });

    })
    .catch((error) => {
      console.log(error);
    })
  });
}

// getAllCoinsInUSD();

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});