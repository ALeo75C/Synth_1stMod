import React from 'react'

export default class Button extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    window.addEventListener('ommouseup', this.props.handleUp)
    window.addEventListener('keydown', this.props.keyDown)
    window.addEventListener('keyup', this.props.keyUp)
  }

  render() {
    return (
      <div
        className={this.props.classes.join(' ')}
        onMouseDown={this.props.handleDown}
        onMouseUp={this.props.handleUp}
      >
        <span>{this.props.text}</span>
        <span>{this.props.text2}</span>
      </div>
    )
  }
}
