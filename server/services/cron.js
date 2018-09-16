const coinRates = require('./coinRates');
const historicalCoinRates = require('./historicalCoinRates');

var CronJob = require('cron').CronJob;

const coinArray = ['BTC', 'ETH', 'XRP', 'LTC', 'BCH', 'DASH']

//Once an hour between 12-7pm = 7 requests * numCoins = 42 requests for 6 coins
new CronJob('0 */60 12-19 * * *', function() {
  coinRates.init(coinArray);

}, null, true, 'America/Los_Angeles');


//Once a day at 11:59:50am = 1 request * numCoins = 6 requests for 6 coins
new CronJob('50 59 11 * * *', function() {
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate()-1);
  yesterday = yesterday.toISOString();

  historicalCoinRates.init(coinArray, yesterday);
}, null, true, 'America/Los_Angeles');