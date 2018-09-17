import React, { Component } from 'react';
import '../../assets/css/CardIcon.css';

class CardIcon extends Component {
  render() {
    const className = this.props.iconClass ? `card-icon ${this.props.iconClass}` : 'card-icon';

    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}

export default CardIcon;