const axios = require('axios');
const keys = require('../config/api_keys');
const dbCon = require('../config/db_config').dbCon;

init = (coins) => {
  getCoinRates(coins);
}

getCoinRates = (coins) => {
    coins.forEach((coin) => {
      axios.get(`https://rest.coinapi.io/v1/exchangerate/${coin}/USD?apikey=${keys.coin_api}`)
        .then((response) => {
          insertCoinRates(response.data);
      });
    });
  },

insertCoinRates = (data) => {
    const base = data.asset_id_base;
    const quote = data.asset_id_quote;
    const rate = data.rate;
    const time = data.time;
    const historical = false;

    const queryString = `INSERT INTO coins (base, quote, rate, time, historical) VALUES (?, ?, ?, ?, ?)`;

    dbCon.connect((error) => {
      dbCon.query(queryString, [base, quote, rate, time, historical], function (err, result) { })
    });
  }

  module.exports = { init, getCoinRates, insertCoinRates };