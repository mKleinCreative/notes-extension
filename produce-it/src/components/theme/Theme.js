import React, { Component } from 'react'

class Theme extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      style: {
        color: '',
        backgroundColor: '',
        fontColor: ''
      }
    }
  }

  componentDidMount() {
    this.props.style ? this.setState({
      name: this.props.name,
      style: this.props.style
    }) : 'fuck you give me a theme you piece of shit!!!!!!'
  }

  render() {
    return (
      <div style={this.props.style}>{this.props.name}</div>
    )
  }
}

export default Theme;