import React, { Component } from 'react';
import FormStep from '../Reusable/FormStep';
import TextField from '@material-ui/core/TextField';

class HindsightView extends Component {
  renderDateForm = () => {
    return (
      <TextField
        id="date"
        label="Date"
        type="date"
        defaultValue={new Date()}
        InputLabelProps={{
          shrink: true,
        }}
      />
    );
  }

  render() {
    return (
      <div className="hindsight-view">
        <h2>Bitcoin Hindsight Tool</h2>
        <div className="view-container">

        <FormStep step={1} title={'Select a date'}>
          {this.renderDateForm()}
        </FormStep>

        <FormStep step={2} title={'Select the amount of Bitcoin Purchased'}>
          100000
        </FormStep>

        <FormStep step={'results'}>
          If you purchased x amount of Bitcoin in the year z, today it would be worth $100,000,000
        </FormStep>
        </div>
      </div>
    );
  }
}

export default HindsightView
