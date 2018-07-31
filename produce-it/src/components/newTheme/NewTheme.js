import React, { Component } from 'react'

class NewTheme extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      newTheme: {
        name: '',
        styles: {
          border: '',
          backgroundColor: '',
          fontColor: ''
        }
      }
    }
    this.handleThemeCreation = this.handleThemeCreation.bind(this)
  }

  handleThemeCreation(e) {
    // to do
  }

  render() {
    return (
      <button>{this.props.name}</button>
    )
  }

}

export default NewTheme;