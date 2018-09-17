import React, { Component } from 'react';
import axios from 'axios';
import CurrentCoinContainer from './CurrentCoinContainer';
import '../../assets/css/CurrentCoinView.css';

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

  getYesterdayCoin = (coin, yesterdaysCoins) => {
    for (let i = 0; i < yesterdaysCoins.length; i++) {
      if (coin.base === yesterdaysCoins[i].base) {
        return yesterdaysCoins[i];
      }
    }
  }

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

  renderCoins(mostRecentCoins, yesterdaysCoins) {
    if (mostRecentCoins) {
      return mostRecentCoins.map((coin, i) => {
        const yesterdayCoin = this.getYesterdayCoin(coin, yesterdaysCoins);

        return (
          <CurrentCoinContainer
            coin={coin}
            yesterdayCoin={yesterdayCoin}
            key={i}
          />
        );
      })
    }
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