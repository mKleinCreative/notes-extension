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
    return this.props.style ? this.setState({
      name: this.props.name,
      style: this.props.style
    }) : 'No theme found :( try again'
  }

  render() {
    return (
      <div
        className={this.props.name}
        style={this.props.style}>
          <button className={this.props.name} onClick={this.props.onClick}>
            {this.props.name}
          </button>
      </div>
    )
  }
}

export default Theme;