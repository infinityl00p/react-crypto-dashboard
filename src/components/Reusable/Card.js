import React, { Component } from 'react';
import '../../assets/css/CryptoCard.css';

class CryptoCard extends Component {
  render() {
    return (
      <div className="coin-container">
        <div className="coin-card">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default CryptoCard;