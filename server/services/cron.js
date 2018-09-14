const getCoinRates = require('./coinRates');
const getHistoricalCoinRates = require('./historicalCoinRates');

var CronJob = require('cron').CronJob;

//Once an hour between 12-7pm = 7 requests * numCoins = 42 requests for 6 coins
new CronJob('0 */60 12-19 * * *', function() {
  //Add the new data from the API to the database
}, null, true, 'America/Los_Angeles');


//Once a day at 11:59:50am = 1 request * numCoins = 6 requests for 6 coins
new CronJob('50 59 11 * * *', function() {
  //Erase the all data from database table
  console.log("once a day at 12pm");

  //Add the new data from the API to the database
}, null, true, 'America/Los_Angeles');