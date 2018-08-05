import React from 'react';
import ReactDOM from 'react-dom';
import { copyStyles } from '../../utils'
import chrome from 'chrome-app-api'

export default class ProduceIt extends React.PureComponent {
  constructor(props) {
    super(props);
    this.containerEl = document.createElement('body'); // STEP 1: create an empty div
    this.state = {
      activeTheme: this.props.theme
    }
    this.noteWindow = null;
    this.idFactory = this.idMaker();
  }

  componentDidMount() {
    // STEP 3: open a new browser window and store a reference to it
    this.setState({
      noteWindow: chrome.app.window.create("index.html",
        {
          frame: "none",
          id: `postit-${this.idFactory.next().value}`,
          alwaysOnTop: true,
          innerBounds: {
            width: 360,
            height: 300,
            left: 600,
            minWidth: 220,
            minHeight: 220
          }
        }
      )
    }).then(() => {
      // STEP 4: append the container <div> (that has props.children appended to it) to the body of the new window
      this.noteWindow.document.body.appendChild(this.containerEl);

      this.noteWindow.document.title = 'A React portal window';
      let targetTheme = document.querySelector(`.${this.state.activeTheme}`).style
      copyStyles(targetTheme, this.noteWindow.document);

      // update the state in the parent component if the user closes the 
      // new window
      this.noteWindow.addEventListener('load', () => {
        this.props.closeWindowPortal();
      });

    })
  }

  componentWillUnmount() {
    // This will fire when this.state.activeWindows in the parent component becomes false
    // So we tidy up by just closing the window
    this.noteWindow.close();
  }

  idMaker = function* () {
    var index = 0;
    var latest = 0;
    while (index < latest + 1)
      if (index < latest) index = latest
    latest = index++
    yield latest;
  }
  render() {
    // STEP 2: append props.children to the container <div> that isn't mounted anywhere yet
    return ReactDOM.createPortal(this.props.children, this.containerEl);
  }
}