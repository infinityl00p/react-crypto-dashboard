import React, { Component } from 'react';
import '../assets/css/App.css';
import Sidebar from './Sidebar/Sidebar';
import CurrentCoinView from './DashboardView/CurrentCoinView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <main>
          <CurrentCoinView />
        </main>
      </div>
    );
  }
}

export default App;
