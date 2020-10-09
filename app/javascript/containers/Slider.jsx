import React from 'react'

export default class Slider extends React.Component {
  constructor(props) {
    super(props)
    this.input = React.createRef()
  }

  componentDidMount() {
    const { current } = this.props
    this.input.current.value = current
  }

  render() {
    const { min, max, handleInput, name, current } = this.props

    return (
      <div className="Slider">
        <span>{name}</span>
        <input
          ref={this.input}
          type="range"
          step="0.01"
          className="slider"
          min={min}
          max={max}
          onInput={() => {
            handleInput(name, this.input.current.value)
          }}
        />
      </div>
    )
  }
}
