import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import CurrentCoinView from './CurrentCoinView';

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
