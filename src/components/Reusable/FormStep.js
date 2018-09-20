import React, { Component } from 'react';
import Card from './Card';
import CardIcon from './CardIcon';
import '../../assets/css/FormStep.css';

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

  getClassName = () => {
    if (this.props.step === this.props.currentStep) {
      return "active";
    } else if (this.props.step > this.props.currentStep) {
      return "inactive";
    }
    return "complete";
  }

  isDisabled = () => {
    if (this.props.step > this.props.currentStep) {
      return true;
    }
    return false;
  }

  render() {
    const className = this.getClassName();

    return (
      <Card
        disabled={this.isDisabled()}
      >
        <div className={className}>
          <CardIcon>
            <div className="icon--number">{this.props.icon}</div>
          </CardIcon>
        </div>
        {this.renderTitle()}
        <div className="content--center">
          {this.props.children}
        </div>
      </Card>

    );
  }
}

export default FormStep;