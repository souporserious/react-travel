import React, { Component, Children, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Travel from '../src/react-travel'
import $ from 'jquery'
import 'jquery-ui'

import './main.scss'

class App extends Component {
  state = {
    toggleText: false,
    dialogOpen: false
  }

  render() {
    const { toggleText, dialogOpen } = this.state

    return(
      <div id="travel-origin">
        <button
          onClick={() =>
            this.setState({toggleText: !this.state.toggleText})
          }
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
            background: toggleText ? 'blue' : 'yellow'
          }}
        >
          <div ref="cool">
            <div>Where we're going</div>
            {
              toggleText &&
              <div>We don't need roads</div>
            }
          </div>
        </Travel>

        <button
          onClick={() =>
            this.setState({dialogOpen: !this.state.dialogOpen})
          }
        >
          Toggle Dialog
        </button>
        <Travel
          onMount={node => {
            return(
              $(node).dialog({
                autoOpen: false,
                close: () => {
                  this.setState({dialogOpen: false})
                }
              }).data('ui-dialog')
            )
          }}
          onUpdate={dialog => {
            if(dialogOpen) {
              dialog.open()
            } else {
              dialog.close()
            }
          }}
        >
          <div>
            Even Works With Dialogs
            {
              toggleText &&
              <div>How neat is that!</div>
            }
          </div>
        </Travel>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))