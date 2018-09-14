module.exports = {
  getHistoricalCoinRates: (coins, time_start) => {
    const symbol_id = 'BITSTAMP_SPOT_BTC_USD';
    const period_id = '1DAY';

    axios.get(`https://rest.coinapi.io/v1/ohlcv/${symbol_id}/history?period_id=${period_id}&time_start=${time_start}`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }
}