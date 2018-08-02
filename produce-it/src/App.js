import React, { Component } from 'react';
import logo from './logo.svg';
import ThemeManager from './containers/themeManager/ThemeManager';
import './css/style.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Choose a theme</h1>
        </header>
        <ThemeManager />
      </div>
    );
  }
}

export default App;
