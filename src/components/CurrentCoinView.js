import React, { Component } from 'react';
import axios from 'axios';
import BCH from '../../node_modules/cryptocurrency-icons/svg/white/bch.svg';
import BTC from '../../node_modules/cryptocurrency-icons/svg/white/btc.svg';
import DAS from '../../node_modules/cryptocurrency-icons/svg/white/dash.svg';
import ETH from '../../node_modules/cryptocurrency-icons/svg/white/eth.svg';
import LTC from '../../node_modules/cryptocurrency-icons/svg/white/ltc.svg';
import XRP from '../../node_modules/cryptocurrency-icons/svg/white/xrp.svg';
import '../assets/css/CurrentCoinView.css';

class CurrentCoinView extends Component {
  constructor() {
    super();

    this.state = {
      coins: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/coins')
      .then((response) => {
        this.setState({ coins: response.data });
      })
  }

  renderCoins(mostRecentCoins, yesterdaysCoins) {
    if (mostRecentCoins) {
      return mostRecentCoins.map((coin, i) => {
        const iconContainerClass = `${coin.base} icon-container`;
        const percentageChange = this.getPercentageChange(coin, yesterdaysCoins);
        const percentageClass = `price-change price-change--right ${percentageChange.integerType}`


        return (
          <div key={i} className="coin-container">
            <div className="coin-card">
              <div className={iconContainerClass}>
                <img src={this.getImageSrc(coin.base)} alt={coin.base} />
              </div>
              <div className="text-container">
                <h3>{this.getCoinName(coin.base)}</h3>
                <p>${coin.rate} USD</p>
              </div>
              <div className="price-change-container">
                <p className="price-change price-change--left">24 Hour Change</p>
                <p className={percentageClass}>{percentageChange.percentage}%</p>
              </div>
            </div>
          </div>
        );
      })
    }
  }

  getImageSrc = (coin) => {
    switch(coin) {
      case 'BCH': return BCH;
      case 'BTC': return BTC;
      case 'DAS': return DAS;
      case 'ETH': return ETH;
      case 'LTC': return LTC;
      case 'XRP': return XRP;
      default: return;
    }
  }

  getCoinName = (coin) => {
    switch(coin) {
      case 'BCH': return 'Bitcoin Cash';
      case 'BTC': return 'Bitcoin';
      case 'DAS': return 'Dash';
      case 'ETH': return 'Ethereum';
      case 'LTC': return 'Litecoin';
      case 'XRP': return 'Ripple';
      default: return;
    }
  }

  getPercentageChange = (coin, yesterdaysCoins) => {
    let percentage;

    for (let i = 0; i < yesterdaysCoins.length; i++) {
      if (yesterdaysCoins[i].base === coin.base) {
        if (coin.rate > yesterdaysCoins[i].rate) {
          percentage = ((coin.rate / yesterdaysCoins[i].rate) - 1).toFixed(5);
          break;
        } else if (yesterdaysCoins[i].rate > coin.rate) {
          percentage = (-(yesterdaysCoins[i].rate / coin.rate) - 1).toFixed(5);
          break;
        } else {
          percentage = 0;
          break;
        }
      }
    }

    const percentageString = percentage.toString();

    if (percentageString.length === 1) {
      return { percentage, integerType: 'neutral' }
    } else if (percentageString.charAt(0) === '-') {
      return { percentage, integerType: 'negative' }
    } else {
      return { percentage, integerType: 'positive' }
    }
  }

  //The last 6 items of the array will always be the most recent
  getMostRecentCoins = (numRecent) => {
    const mostRecentCoins = [];
    if (this.state.coins.length) {
      const sortedByTime = this.state.coins.sort((a, b) => {
        a = new Date(a.time);
        b = new Date(b.time);

        return a>b ? -1 : a<b ? 1 : 0;
      });

      for (var i = 0; i < numRecent; i++) {
        mostRecentCoins.push(sortedByTime[i]);
      }

      return mostRecentCoins;
    } else { return; }
  }

  getYesterdaysCoins = () => {
    return this.state.coins.filter((coin) => {
      return coin.historical;
    })
  }

  render() {
    const mostRecentCoins = this.getMostRecentCoins(6);
    const yesterdaysCoins = this.getYesterdaysCoins(mostRecentCoins);

    return (
      <div className="current-coin-view">
        { this.renderCoins(mostRecentCoins, yesterdaysCoins) }
      </div>
    );
  }
}

export default CurrentCoinView;