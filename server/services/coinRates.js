module.exports = {
  getCoinRates: (coins) => {
    coins.forEach((coin) => {
      axios.get(`https://rest.coinapi.io/v1/exchangerate/${coin}/USD?apikey=${keys.coin_api}`)
        .then((response) => {
          const base = response.data.asset_id_base;
          const quote = response.data.asset_id_quote;
          const rate = response.data.rate;
          const time = response.data.time;

          insertCoinRates();
      });
    });
  },

  insertCoinRates: () => {
    const queryString = `INSERT INTO coins (base, quote, rate, time) VALUES (?, ?, ?, ?)`;

    dbCon.connect((error) => {
      dbCon.query(queryString, [base, quote, rate, time], function (err, result) {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log(error);
      })
    });
  }
}