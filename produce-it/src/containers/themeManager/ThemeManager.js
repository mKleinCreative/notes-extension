import React from 'react';
import ReactDOM from 'react-dom';
import Theme from '../../components/theme/Theme';

function copyStyles(sourceDoc, targetDoc) {
  console.log("sourceDoc", sourceDoc.cssText);
  targetDoc
    .getElementsByTagName("body")[0]
    .setAttribute("style", sourceDoc.cssText);
}

class ProduceIt extends React.PureComponent {
  constructor(props) {
    super(props);
    this.containerEl = document.createElement('body'); // STEP 1: create an empty div
    this.state = {
      theme: this.props.theme
    }
    this.noteWindow = null;
  }

  componentDidMount() {
    // STEP 3: open a new browser window and store a reference to it
    this.noteWindow = window.open('', '', 'status=0,resizeable=0,scroll=0,width=600,height=400,left=200,top=200,chrome=1,locationbar=0');

    // STEP 4: append the container <div> (that has props.children appended to it) to the body of the new window
    console.log('document.body (╯°□°)╯︵ ┻━┻ ', document.body)
    this.noteWindow.document.body.appendChild(this.containerEl);

    this.noteWindow.document.title = 'A React portal window';
    let targetTheme = document.querySelector(`.${this.state.theme}`).style
    copyStyles(targetTheme, this.noteWindow.document);

    // update the state in the parent component if the user closes the 
    // new window
    this.noteWindow.addEventListener('beforeunload', () => {
      this.props.closeWindowPortal();
    });
  }

  componentWillUnmount() {
    // This will fire when this.state.activeWindows in the parent component becomes false
    // So we tidy up by just closing the window
    this.noteWindow.close();
  }

  render() {
    // STEP 2: append props.children to the container <div> that isn't mounted anywhere yet
    return ReactDOM.createPortal(this.props.children, this.containerEl);
  }
}



export default class ThemeManager extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeWindows: false,
      theme: ''
    };

    this.createProduceWindow = this.createProduceWindow.bind(this);
    this.closeWindowPortal = this.closeWindowPortal.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', () => {
      this.closeWindowPortal();
    });
  }

  createProduceWindow(e) {
    let parentTheme = e.target.className
    this.setState(state => ({
      ...state,
      theme: parentTheme,
      activeWindows: [`${parentTheme}`] += 1
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
            border: '8px solid green',
            backgroundColor: 'orangered', 
            color: 'white', 
            margin: '0'
          }} 
          name='watermelon'
          onClick={this.createProduceWindow}
        />

        {this.state.activeWindows && (
          <ProduceIt theme={this.state.theme} closeWindowPortal={this.closeWindowPortal} >
            <h1>I am a {this.state.theme}</h1>
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
