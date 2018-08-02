import React, { Component } from 'react';
import logo from './logo.svg';
import ThemeManager from './containers/themeManager/ThemeManager';
import './css/style.css';

class App extends Component {
  state = {
    themes: {
      lemon: {
        name: 'lemon',
        windowCount: 0,
        style: {
          border: '8px solid lemonchiffon',
          backgroundColor: 'yellow',
          color: 'black',
          margin: '0'
        }
      },
      grape: {
        name: 'grape',
        windowCount: 0,
        style: {
          border: '8px solid green',
          backgroundColor: 'purple',
          color: 'white',
          margin: '0'
        }
      },
      watermelon: {
        name: 'watermelon',
        windowCount: 0,
        style: {
          border: '8px solid green',
          backgroundColor: 'orangered',
          color: 'white',
          margin: '0'
        }
      }
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Choose a theme</h1>
        </header>
        <ThemeManager themes={this.state.themes} />
      </div>
    );
  }
}

export default App;
