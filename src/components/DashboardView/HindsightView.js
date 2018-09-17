import React, { Component } from 'react';
import Card from '../Reusable/Card';
import CardIcon from '../Reusable/CardIcon';

class HindsightView extends Component {
  render() {
    return (
      <div className="hindsight-view">
        <h2>Hindsight View</h2>
        <div className="view-container">
          <Card>
            <CardIcon>
              <div className='icon--number'>1</div>
            </CardIcon>
          </Card>
        </div>
      </div>
    );
  }
}

export default HindsightView;