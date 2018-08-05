import React from 'react';
import ProduceIt from '../../components/produceIt/ProduceIt';
import Theme from '../../components/theme/Theme';

export default class ThemeManager extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeWindows: false,
      activeTheme: ''
    };

    this.createProduceWindow = this.createProduceWindow.bind(this);
    this.closeWindowPortal = this.closeWindowPortal.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', () => {
      this.closeWindowPortal();
    });
  }

  createProduceWindow(e) {
    let parentTheme = e.target.className
    let windowCount = this.state.activeWindows
    console.log(' windowCount(╯°□°)╯︵ ┻━┻ ', windowCount)
    this.setState(state => ({
      ...state,
      activeTheme: parentTheme,
      activeWindows: true
    }));
  }

  closeWindowPortal() {
    this.setState({ activeWindows: false })
  }

  render() {
    return (
      <div>
        <button onClick={this.createProduceWindow}>
          {this.state.activeWindows ? 'Close the' : 'Open a'} Portal
        </button>

        <Theme
          style={{ 
            textDecoration: 'none',
            border: '8px solid lemonchiffon', 
            backgroundColor: 'yellow', 
            color: 'black', 
            margin: '0' 
          }}
          name='lemon'
          onClick={this.createProduceWindow}
        />
        <Theme
          style={{ 
            textDecoration: 'none',
            border: '8px solid green', 
            backgroundColor: 'purple', 
            color: 'white', 
            margin: '0'
          }}
          name='grape'
          onClick={this.createProduceWindow}
        />
        <Theme
          style={{
            textDecoration: 'none',
            border: '8px solid green',
            backgroundColor: 'orangered', 
            color: 'white', 
            margin: '0'
          }} 
          name='watermelon'
          onClick={this.createProduceWindow}
        />

        {this.state.activeWindows && (
          <ProduceIt theme={this.state.activeTheme} closeWindowPortal={this.closeWindowPortal} >
            <h1>I am a {this.state.activeTheme}</h1>
            <p>Even though I render in a different window, I share state!</p>

            <button onClick={() => this.closeWindowPortal()} >
              Close me!
            </button>
          </ProduceIt>
        )}
      </div>
    );
  }
}
