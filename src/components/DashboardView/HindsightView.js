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
      date: {
        selectedDate: today,
        error: ''
      },
      amount: 0,
      rate: 0,
      dollarValue: 0
    }
  }

  renderDateForm = () => {
    return (
      <TextField
        id="date"
        label="Date"
        type="date"
        onChange={this.validateDate}
        value={this.state.date.selectedDate}
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
      const date = this.state.date;
      date.error = errorMessage;
      this.setState({ selectedDate });
    } else {
      const date = this.state.date;
      date.selectedDate = dateString;
      date.error = '';
      this.setState({ date });
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
        value={this.state.amount}
        onChange={this.handleInputChange}
        margin="normal"
      />
    );
  }

  handleInputChange = (e) => {
    this.setState({
      amount: e.target.value
    });
  }

  getTwoDecimalPlaces = (amount) => {
    return Math.round(amount * 100) / 100;
  }

  getRate = () => {
    axios.get(`http://localhost:5000/api/hindsight/?time=${this.state.date.selectedDate}T10:00:00Z`)
      .then((response) => {
        let { rate } = response.data;
        rate = this.getTwoDecimalPlaces(rate);
        this.setState({ rate });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  getDollarValue = () => {
    axios.get(`http://localhost:5000/api/bitcoin`)
      .then((response) => {
        const { rate } = response.data;
        let dollarValue = rate * this.state.amount;
        dollarValue = this.getTwoDecimalPlaces(dollarValue);
        this.setState({ dollarValue });
      })
      .catch((error) => {
        console.log(error);
      })
  }


  render() {
    return (
      <div className="hindsight-view">
        <h2>Bitcoin Hindsight Tool</h2>
        <div className="view-container">

        <FormStep step={1} title={'Select a date'}>
          {this.renderDateForm()}
          <div className="error-message">
            {this.state.date.error}
          </div>
          <Button color="primary" className={this.props.classes.button} onClick={this.getRate}>
            Next
          </Button>
        </FormStep>

        <FormStep step={2} title={'Select the amount of Bitcoin Purchased'}>
          {this.renderAmountForm()}
          <Button color="primary" className={this.props.classes.button} onClick={this.getDollarValue}>
            Next
          </Button>
        </FormStep>

        <FormStep step={'results'}>
          If you purchased {this.state.amount} Bitcoin on {this.state.date.selectedDate} at a rate of ${this.state.rate}, today it would be worth ${this.state.dollarValue}
        </FormStep>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(HindsightView);
