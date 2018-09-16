import React, { Component } from 'react';
import axios from 'axios';
import BCH from '../node_modules/cryptocurrency-icons/svg/white/bch.svg';
import BTC from '../node_modules/cryptocurrency-icons/svg/white/btc.svg';
import DAS from '../node_modules/cryptocurrency-icons/svg/white/dash.svg';
import ETH from '../node_modules/cryptocurrency-icons/svg/white/eth.svg';
import LTC from '../node_modules/cryptocurrency-icons/svg/white/ltc.svg';
import XRP from '../node_modules/cryptocurrency-icons/svg/white/xrp.svg';
import './CurrentCoinView.css';

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
                <p className="price-change price-change--right">{this.getPercentageChange(coin, yesterdaysCoins)}</p>
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
    //I only want to loop through the array up until I find the correct value then break
    yesterdaysCoins.array.forEach(element => {

    });
    //return a single number and postive or negative
  }

  //The last 6 items of the array will always be the most recent
  //FIXME: in the future, this may need to be updated
  getMostRecentCoins = (numRecent) => {
    const mostRecentCoins = [];
    if (this.state.coins.length) {
      for (var i = this.state.coins.length - numRecent; i < this.state.coins.length; i++) {
        mostRecentCoins.push(this.state.coins[i]);
      }
    } else { return; }

    return mostRecentCoins;
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