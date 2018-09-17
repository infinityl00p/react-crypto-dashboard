import React, { Component } from 'react';
import '../../assets/css/Card.css';

class CryptoCard extends Component {
  render() {
    return (
      <div className="card-container">
        <div className="card">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default CryptoCard;