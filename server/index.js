const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const keys = require('./api_keys');

const app = express();


let port = 5000 || process.env.PORT

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

// const getAllCoinsInUSD = () => {
//   const cryptoCoins = ['BTC', 'ETH'];
//   const cryptoCurrencyValues = [];

//   cryptoCoins.forEach((coin) => {
//     axios.get(`https://rest.coinapi.io/v1/exchangerate/${coin}/USD?apikey=${keys.coinApi}`)
//     .then((response) => {
//       console.log(response.data);
//       cryptoCurrencyValues.push(response.data);
//     })
//     .catch((error) => {
//       console.log(error);
//     })
//   });

//   console.log(cryptoCurrencyValues);
// }

// getAllCoinsInUSD();

// [0] { time: '2018-09-13T14:57:46.5712577Z',
// [0]   asset_id_base: 'ETH',
// [0]   asset_id_quote: 'USD',
// [0]   rate: 202.64736524900775 }
// [0] { time: '2018-09-13T14:57:48.9619488Z',
// [0]   asset_id_base: 'BTC',
// [0]   asset_id_quote: 'USD',
// [0]   rate: 6522.570752358936 }

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});