import React, { Component } from 'react';
import './assets/css/App.css';
import Sidebar from './components/Sidebar';
import CurrentCoinView from './components/CurrentCoinView';

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
