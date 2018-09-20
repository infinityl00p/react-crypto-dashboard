import React, { Component } from 'react';
import FormStep from '../Reusable/FormStep';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import '../../assets/css/HindsightView.css';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class HindsightView extends Component {
  constructor() {
    super();

    const today = this.formatDate(new Date());

    this.state = {
      step1: {
        date: {
          selectedDate: today,
          error: ''
        },
      },
      step2: {
        amount: 0,
      },
      results: {
        rate: 0,
        dollarValue: 0
      },
      currentStep: 1,
    }
  }

  renderDateForm = () => {
    return (
      <TextField
        id="date"
        label="Date"
        type="date"
        onChange={this.validateDate}
        value={this.state.step1.date.selectedDate}
      />
    );
  }

  //2011-04-02T10:00:00Z  Earliest Available Date
  validateDate = (e) => {
    const dateString = e.target.value,
          minDate = new Date('2011-04-01T10:00:00Z'),
          selectedDate = new Date(dateString),
          errorMessage = 'Earliest available date is 2011-04-02'


    if (selectedDate < minDate) {
      const { step1 } = this.state;
      const { date } = step1;
      date.error = errorMessage;
      this.setState({ step1 });
    } else {
      const { step1 } = this.state;
      const { date } = step1;
      date.selectedDate = dateString;
      date.error = '';
      this.setState({ step1 });
    }

  }

  //"yyyy-mm-dd"
  formatDate = (dateObject) => {
    let month = '' + (dateObject.getMonth() + 1),
          day = '' + dateObject.getDate(),
          year = dateObject.getFullYear();

    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }

    return [year, month, day].join('-');
  }

  renderAmountForm = () => {
    return (
      <TextField
        id="Amount"
        label="Amount"
        value={this.state.step2.amount}
        onChange={this.handleInputChange}
        margin="normal"
      />
    );
  }

  handleInputChange = (e) => {
    this.setState({
      step2: { amount: e.target.value }
    });
  }

  getTwoDecimalPlaces = (amount) => {
    return Math.round(amount * 100) / 100;
  }

  getRate = () => {
    axios.get(`http://localhost:5000/api/hindsight/?time=${this.state.step1.date.selectedDate}T10:00:00Z`)
      .then((response) => {
        let { rate } = response.data;
        let { results } = this.state;
        rate = this.getTwoDecimalPlaces(rate);
        results.rate = rate;
        this.setState({
          results,
          currentStep: 2
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  getDollarValue = () => {
    axios.get(`http://localhost:5000/api/bitcoin`)
      .then((response) => {
        const { rate } = response.data;
        const { results } = this.state;
        let dollarValue = rate * this.state.step2.amount;
        dollarValue = this.getTwoDecimalPlaces(dollarValue);
        dollarValue = this.toCommas(dollarValue)
        results.dollarValue = dollarValue;
        this.setState({
          results,
          currentStep: 3
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  toCommas = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  getButtonText = (step) => {
    if (step < this.state.currentStep) {
      return 'Update';
    } return 'Next';
  }

  renderButton = (step, currentStep) => {
    if (currentStep < step) {
      return (
        <Button color="primary" className={this.props.classes.button} onClick={this.getRate} disabled>
          {this.getButtonText(step)}
        </Button>
      );
    } else if (step === 1) {
      return (
        <Button color="primary" className={this.props.classes.button} onClick={this.getRate}>
          {this.getButtonText(step)}
        </Button>
      );
    } else {
      return (
        <Button color="primary" className={this.props.classes.button} onClick={this.getDollarValue}>
          {this.getButtonText(step)}
        </Button>
      );
    }

  }

  render() {
    return (
      <div className="hindsight-view">
        <h2>Bitcoin Hindsight Tool</h2>
        <div className="view-container">

        <FormStep
          icon={1}
          step={1}
          title={'Select a date'}
          currentStep={this.state.currentStep}
        >
          {this.renderDateForm()}
          <div className="error-message">
            {this.state.step1.date.error}
          </div>

          {this.renderButton(1, this.state.currentStep)}
        </FormStep>

        <FormStep
          icon={2}
          step={2}
          title={'Number of Bitcoin purchased'}
          currentStep={this.state.currentStep}
        >
          {this.renderAmountForm()}
          {this.renderButton(2, this.state.currentStep)}
        </FormStep>

        <FormStep
          icon={'results'}
          step={3}
          currentStep={this.state.currentStep}
        >
          <div className="results">If you purchased <span className="important">{this.state.step2.amount}</span> BTC on <span className="important">{this.state.step1.date.selectedDate}</span> at <span className="important">${this.state.results.rate}</span> per BTC, today it would be worth <span className="extra-important">${this.state.results.dollarValue}</span></div>
        </FormStep>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(HindsightView);
