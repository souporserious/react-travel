import React, { Component, Children, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { AriaManager, AriaToggle, AriaPopover } from 'react-aria'
import Travel from '../src/react-travel'

import './main.scss'

class Popover extends Component {
  state = {
    isOpen: false,
  }

  render() {
    const { isOpen } = this.state
    return (
      <AriaManager
        type="popover"
        onPopoverOpen={() => this.setState({ isOpen: true })}
        onPopoverClose={() => this.setState({ isOpen: false })}
        openPopoverOn="hover"
      >
        <div>
          <h3>Popover</h3>
          <AriaToggle className="popover-toggle">
            Toggle Popover <span>👻</span>
          </AriaToggle>
          {isOpen &&
            <Travel>
              <AriaPopover>
                Some cool popover content.
              </AriaPopover>
            </Travel>}
          <div>
            Popover is {isOpen ? 'Open' : 'Closed'}
          </div>
        </div>
      </AriaManager>
    )
  }
}
class Dropdown extends Component {
  state = { isOpen: false }
  toggle = () => {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }))
  }
  render() {
    const { label, children } = this.props
    return (
      <Travel useArray>
        <button onClick={this.toggle}>
          {label}
        </button>
        {this.state.isOpen &&
          <div>
            {children}
          </div>}
      </Travel>
    )
  }
}
class App extends Component {
  state = {
    toggleText: false,
  }
  render() {
    const { toggleText, dialogOpen } = this.state
    return (
      <div id="travel-origin">
        <button
          onClick={() => this.setState({ toggleText: !this.state.toggleText })}
        >
          Toggle Text
        </button>
        <Travel
          to="#the-future"
          id="delorean"
          className="great-scott"
          style={{
            padding: 12,
            color: toggleText ? '#fff' : '#000',
            background: toggleText ? 'blue' : 'yellow',
          }}
        >
          <div>
            <div>Where we're going</div>
            {toggleText && <div>We don't need roads</div>}
          </div>
        </Travel>
        {toggleText &&
          <Travel>
            <div>Toggled Travel</div>
          </Travel>}

        <Dropdown label="Trigger">
          Content
        </Dropdown>

        <Popover />
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'))
