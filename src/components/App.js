import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import CurrentCoinView from './DashboardView/CurrentCoinView';
import HindsightView from './DashboardView/HindsightView';
import ConversionView from './DashboardView/ConversionView';
import '../assets/css/App.css';

class App extends Component {
  state = { activeComponent: 'Current Rates'}

  updateActiveComponent = (component) => {
    if (component !== this.state.activeComponent) {
      return this.setState({ activeComponent: component });
    }

    return;
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Sidebar
            activeComponent={this.state.activeComponent}
            handleClick={this.updateActiveComponent}
          />
          <main>
            <Route exact path='/' component={CurrentCoinView} />
            <Route exact path='/hindsight' component={HindsightView} />
            <Route exact path='/conversion' component={ConversionView} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
