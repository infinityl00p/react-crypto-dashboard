import React, { Component } from 'react';
import Card from './Card';
import CardIcon from './CardIcon';

class FormStep extends Component {
  renderTitle = () => {
    if (this.props.title) {
      return (
        <div className="text-container">
          <h3>{this.props.title}</h3>
        </div>
      );
    } return;
  }

  render() {
    return (
      <Card>
        <CardIcon>
          <div className='icon--number'>{this.props.step}</div>
        </CardIcon>
        {this.renderTitle()}
        <div className="content--center">
          {this.props.children}
        </div>
      </Card>

    );
  }
}

export default FormStep;