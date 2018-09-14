const axios = require('axios');
const keys = require('../config/api_keys');
const dbCon = require('../config/db_config').dbCon;

init = (coins, yesterday) => {
  wipeCoinTable();
  getHistoricalCoinRates(coins, yesterday);
}

getHistoricalCoinRates = (coins, yesterday) => {
    const symbol_id = 'BITSTAMP_SPOT_BTC_USD';
    const period_id = '1DAY';

    coins.forEach((coin) => {
      axios.get(`https://rest.coinapi.io/v1/exchangerate/${coin}/USD?time=${yesterday}&apikey=${keys.coin_api}`)
        .then((response) => {
          // console.log(response.data);
          insertHistoricalCoinRates(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    });
}

wipeCoinTable = () => {
  const queryString ='DELETE FROM coins';

  dbCon.connect((error) => {
    dbCon.query(queryString, function (err, result) { })
  });
}

insertHistoricalCoinRates = (data) => {
  const base = data.asset_id_base;
  const quote = data.asset_id_quote;
  const rate = data.rate;
  const time = data.time;
  const historical = true;

  const queryString = `INSERT INTO coins (base, quote, rate, time, historical) VALUES (?, ?, ?, ?, ?)`;

  dbCon.connect((error) => {
    dbCon.query(queryString, [base, quote, rate, time, historical], function (err, result) { })
  });

}

module.exports = { init, getHistoricalCoinRates, wipeCoinTable, insertHistoricalCoinRates }