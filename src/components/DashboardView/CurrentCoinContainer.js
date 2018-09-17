import React, { Component } from 'react';
import CryptoCard from './CryptoCard';
import BCH from '../../../node_modules/cryptocurrency-icons/svg/white/bch.svg';
import BTC from '../../../node_modules/cryptocurrency-icons/svg/white/btc.svg';
import DAS from '../../../node_modules/cryptocurrency-icons/svg/white/dash.svg';
import ETH from '../../../node_modules/cryptocurrency-icons/svg/white/eth.svg';
import LTC from '../../../node_modules/cryptocurrency-icons/svg/white/ltc.svg';
import XRP from '../../../node_modules/cryptocurrency-icons/svg/white/xrp.svg';
import '../../assets/css/CurrentCoinContainer.css';

class CurrentCoinContainer extends Component {
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

  getPercentageObject = (coin, yesterdaysCoins) => {
    let percentage;

    percentage = this.getPercentage(coin, yesterdaysCoins);
    const percentageString = percentage.toString();

    if (percentageString.length === 1) {
      return { percentage, integerType: 'neutral' }
    } else if (percentageString.charAt(0) === '-') {
      return { percentage, integerType: 'negative' }
    } else {
      return { percentage, integerType: 'positive' }
    }
  }

  getPercentage = (coin, yesterdayCoin) => {
    if (coin.rate > yesterdayCoin.rate) {
      return ((coin.rate / yesterdayCoin.rate) - 1).toFixed(5);
    } else if (yesterdayCoin.rate > coin.rate) {
      return (-(yesterdayCoin.rate / coin.rate) - 1).toFixed(5);
    } else {
      return 0;
    }
  }


  render() {
    const iconContainerClass = `${this.props.coin.base} icon-container`;
    const percentageChange = this.getPercentageObject(this.props.coin, this.props.yesterdayCoin);
    const percentageClass = `price-change price-change--right ${percentageChange.integerType}`

    return (
      <CryptoCard>
        <div className={iconContainerClass}>
          <img src={this.getImageSrc(this.props.coin.base)} alt={this.props.coin.base} />
        </div>
        <div className="text-container">
          <h3>{this.getCoinName(this.props.coin.base)}</h3>
          <p>${this.props.coin.rate} USD</p>
        </div>
        <div className="price-change-container">
          <p className="price-change price-change--left">24 Hour Change</p>
          <p className={percentageClass}>{percentageChange.percentage}%</p>
        </div>
      </CryptoCard>
    );
  }
}

export default CurrentCoinContainer;