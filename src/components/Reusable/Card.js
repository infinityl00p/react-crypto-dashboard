import React, { Component } from 'react';
import '../../assets/css/Card.css';

class Card extends Component {
  render() {
    const className = this.props.disabled ? "card-container disabled" : "card-container";

    return (
      <div className={className} disabled={this.props.disabled}>
        <div className="card">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Card;