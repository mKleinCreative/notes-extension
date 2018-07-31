import React from 'react';
import ReactDOM from 'react-dom';
import Theme from '../../components/theme/Theme';

function copyStyles(sourceDoc, targetDoc) {
  Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
    if (styleSheet.cssRules) { // true for inline styles
      const newStyleEl = sourceDoc.createElement('style');

      Array.from(styleSheet.cssRules).forEach(cssRule => {
        newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
      });

      targetDoc.head.appendChild(newStyleEl);
    } else if (styleSheet.href) { // true for stylesheets loaded from a URL
      const newLinkEl = sourceDoc.createElement('link');

      newLinkEl.rel = 'stylesheet';
      newLinkEl.href = styleSheet.href;
      targetDoc.head.appendChild(newLinkEl);
    }
  });
}

class ProduceIt extends React.PureComponent {
  constructor(props) {
    super(props);
    this.containerEl = document.createElement('div'); // STEP 1: create an empty div
    this.noteWindow = null;
  }

  componentDidMount() {
    // STEP 3: open a new browser window and store a reference to it
    this.noteWindow = window.open('', '', 'width=600,height=400,left=200,top=200');

    // STEP 4: append the container <div> (that has props.children appended to it) to the body of the new window
    this.noteWindow.document .body.appendChild(this.containerEl);

    this.noteWindow.document.title = 'A React portal window';
    copyStyles(document, this.noteWindow.document);

    // update the state in the parent component if the user closes the 
    // new window
    this.noteWindow.addEventListener('beforeunload', () => {
      this.props.closeWindowPortal();
    });
  }

  componentWillUnmount() {
    // This will fire when this.state.showWindowPortal in the parent component becomes false
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
      counter: 0,
      showWindowPortal: false,
      theme: ''
    };

    this.toggleWindowPortal = this.toggleWindowPortal.bind(this);
    this.closeWindowPortal = this.closeWindowPortal.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', () => {
      this.closeWindowPortal();
    });

    window.setInterval(() => {
      this.setState(state => ({
        counter: state.counter + 1,
      }));
    }, 1000);
  }

  toggleWindowPortal() {
    this.setState(state => ({
      ...state,
      showWindowPortal: !state.showWindowPortal,
    }));
  }

  closeWindowPortal() {
    this.setState({ showWindowPortal: false })
  }

  render() {
    return (
      <div>
        <h1>Counter: {this.state.counter}</h1>

        <button onClick={this.toggleWindowPortal}>
          {this.state.showWindowPortal ? 'Close the' : 'Open a'} Portal
        </button>

        <Theme 
          style={{border: '8px solid lemonchiffon', backgroundColor: 'yellow', color: 'black'}} 
          name='lemon' 
          onClick={() => this.toggleWindowPortal()}
          />
        <Theme 
          style={{border: '8px solid green', backgroundColor: 'purple', color: 'white'}} 
          name='grape' 
          onClick={() => this.toggleWindowPortal()}
          />
        <Theme 
          style={{border: '8px solid green', 
          backgroundColor: 'orangered', color: 'white'}} name='watermelon' 
          onClick={() => this.toggleWindowPortal()}
          />

        {this.state.showWindowPortal && (
          <ProduceIt closeWindowPortal={this.closeWindowPortal} >
            <h1>Counter in a portal: {this.state.counter}</h1>
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
