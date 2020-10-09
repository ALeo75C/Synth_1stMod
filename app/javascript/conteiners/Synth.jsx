import React from 'react'
import Button from '../containers/Button'
import Slider from '../containers/Slider'
import Knob from '../containers/Knob'

import * as Tone from 'tone'

export default class Synth extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.setInsrtument()
  }

  setInsrtument = () => {
    const synth = new Tone.PolySynth().toDestination()
    let notes = [
      { note: 'C4', key: 'q', icPlaying: false, classList: ['Button'] },
      { note: 'D4', key: 'w', icPlaying: false, classList: ['Button'] },
      { note: 'E4', key: 'e', icPlaying: false, classList: ['Button'] },
      { note: 'F4', key: 'r', icPlaying: false, classList: ['Button'] },
      { note: 'G4', key: 't', icPlaying: false, classList: ['Button'] },
      { note: 'A4', key: 'y', icPlaying: false, classList: ['Button'] },
      { note: 'B4', key: 'u', icPlaying: false, classList: ['Button'] }
    ]
    this.setState({
      synth,
      notes
    })
    // synth.triggerAttackRelease(['C4', 'E4', 'A4'], 1)
  }

  renderNoteButtons = () => {
    const { notes } = this.state

    let noteButtons = []
    notes.forEach((note, i) => {
      noteButtons.push(
        <Button
          text={note.note}
          text2={note.key}
          handleDown={() => this.startPlayingNote(i)}
          handleUp={() => this.stopPlayingNote(i)}
          keyDown={this.handleFactoryDown(i)}
          keyUp={this.handleFactoryUp(i)}
          classes={note.classList}
          key={i}
        />
      )
    })

    return noteButtons
  }

  changeEnvelope = (name, value) => {
    const { synth, notes } = this.state
    let envelope = {}
    envelope[name] = value
    synth.set({ envelope: envelope })

    this.setState({
      notes,
      synth
    })
  }

  handleFactoryDown = (id) => {
    const { notes } = this.state
    return (event) => {
      if (event.key == notes[id].key) {
        this.handleKeyDown(id)
      }
    }
  }
  handleFactoryUp = (id) => {
    const { notes } = this.state
    return (event) => {
      if (event.key == notes[id].key) {
        this.handleKeyUp(id)
      }
    }
  }

  handleKeyDown = (id) => {
    let { notes, synth } = this.state

    if (!notes[id].icPlaying) {
      notes[id].icPlaying = true
      notes[id].classList.push('on')

      synth.triggerAttack(notes[id].note)
    }
    this.setState({
      notes,
      synth
    })
  }
  handleKeyUp = (id) => {
    const { notes, synth } = this.state

    synth.triggerRelease(notes[id].note)

    notes[id].icPlaying = false
    notes[id].classList.pop()

    this.setState({
      notes,
      synth
    })
  }

  startPlayingNote = (id) => {
    const { synth, notes } = this.state
    synth.triggerAttack(notes[id].note)
    notes[id].isPlaying = true
    notes[id].classList.push('on')

    this.setState({
      synth,
      notes
    })
  }
  stopPlayingNote = (id) => {
    const { synth, notes } = this.state
    synth.triggerRelease(notes[id].note)
    notes[id].isPlaying = false
    notes[id].classList.pop()

    this.setState({
      synth,
      notes
    })
  }

  handleDetuneChange = (value) => {
    const { notes, synth } = this.state
    synth.set({ detune: value })
  }

  handleHighpassChange = (value) => {
    const { synth } = this.state
    let filter = new Tone.Filter(value, 'highpass').toDestination()
    synth.connect(filter)
    console.log(value)
  }
  handlelowpassChange = (value) => {
    const { synth } = this.state
    let filter = new Tone.Filter(value, 'highpass').toDestination()
    synth.connect(filter)
    console.log(value)
  }

  render() {
    if (this.state) {
      return (
        <div className="Synth">
          <div className="keyBoard">{this.renderNoteButtons()}</div>

          <div className="knobsCollection">
            <Knob
              name="detune"
              min="-1000"
              max="1000"
              current="300"
              handleChange={this.handleDetuneChange}
            />
            <Knob
              name="highpass"
              min="400"
              max="3000"
              current="2000"
              handleChange={this.handleHighpassChange}
            />
            <Knob
              name="lowpass"
              min="10000"
              max="15000"
              current="1100"
              handleChange={this.handleHighpassChange}
            />
          </div>

          <div className="slidersCollection">
            <Slider
              min="0"
              max="1"
              name="attack"
              current="0"
              handleInput={this.changeEnvelope}
            />
            <Slider
              min="0"
              max="1"
              name="decay"
              current="0.2"
              handleInput={this.changeEnvelope}
            />
            <Slider
              min="0"
              max="1"
              name="sustain"
              current="0.5"
              handleInput={this.changeEnvelope}
            />
            <Slider
              min="0"
              max="1"
              name="release"
              current="0"
              handleInput={this.changeEnvelope}
            />
          </div>
        </div>
      )
    } else {
      return <div>none</div>
    }
  }
}
