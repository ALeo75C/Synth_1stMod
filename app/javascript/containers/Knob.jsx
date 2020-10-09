import React from 'react'

export default class Knob extends React.Component {
  constructor(props) {
    super(props)

    const { min, max } = props
    const range = max - min
    const coef = (280 / range) * 5

    this.state = {
      range,
      coef,
      deg: 0,
      mouseDown: false,
      cursorY: 0
    }
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.handleMouseUp)
    window.addEventListener('mousemove', this.handleMouseMove)
    this.setState({ deg: this.calcDeg(this.props.current) })
  }

  calcRotattion = (range) => {
    return range * this.state.coef + this.state.deg
  }

  calcDeg = (value) => {
    return value * (this.state.coef / 5)
  }

  calcValue = (deg) => {
    return Math.floor((this.state.range / 280) * (deg + 140))
  }

  handleMouseDown = (e) => {
    this.setState({
      mouseDown: true,
      cursorY: e.screenY
    })
  }

  handleMouseMove = (e) => {
    // e.preventDefault()

    const { handleChange } = this.props

    const { cursorY } = this.state

    if (this.state.mouseDown) {
      const cursorRange = cursorY - e.screenY

      if (cursorRange != 0) {
        let newDeg = this.calcRotattion(cursorRange)
        let newValue = this.calcValue(newDeg)

        if (newDeg <= -140) {
          newDeg = -140
          newValue = this.props.min
        } else if (newDeg >= 140) {
          newDeg = 140
          newValue = this.props.max
        }

        handleChange(newValue)

        this.setState({
          cursorY: e.screenY,
          deg: newDeg
        })
      }
    }
  }

  handleMouseUp = (e) => {
    e.preventDefault()

    this.setState({
      mouseDown: false,
      cursorY: 0
    })
  }

  render() {
    const { deg } = this.state
    const { current, name } = this.props

    const styles = {
      transform: `rotate(${deg}deg)`
    }

    return (
      <div className="Knob" onMouseDown={this.handleMouseDown}>
        <span>{name}</span>
        <div className="body" style={styles}></div>
        <div className="value">{current}</div>
      </div>
    )
  }
}
