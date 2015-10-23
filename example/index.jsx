import React, { Component, Children, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Travel from '../src/react-travel'

import './main.scss'

class App extends Component {
  state = {
    toggle: false
  }

  render() {
    const { toggle } = this.state

    return(
      <div id="travel-origin">
        <button
          onClick={() => this.setState({toggle: !this.state.toggle})}
        >
          Toggle Text
        </button>
        <Travel
          to="#the-future"
          id="delorean"
          className="great-scott"
          style={{
            padding: 12,
            color: toggle ? '#fff' : '#000',
            background: toggle ? 'blue' : 'yellow'
          }}
          getNode={node => console.log(node)}
        >
          <div ref="cool">
            <div>Where we're going</div>
            {
              toggle &&
              <div>We don't need roads</div>
            }
          </div>
        </Travel>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))