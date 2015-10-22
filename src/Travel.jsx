import React, { Component, Children, PropTypes, createElement, cloneElement } from 'react'
import ReactDOM from 'react-dom'
import shallowCompare from 'react/lib/shallowCompare'

const noop = () => null

class Travel extends Component {
  static propTypes = {
    renderTo: PropTypes.any,
    getRef: PropTypes.func,
    onMount: PropTypes.func
  }

  static defaultProps = {
    renderTo: document.body,
    getRef: noop,
    onMount: noop
  }

  componentDidMount() {
    const { renderTo } = this.props
    const portal = document.createElement('div')

    // render to desired location
    if(!renderTo) {
      document.body.appendChild(portal)
    } else {
      renderTo.appendChild(portal)
    }

    // store portal to remove later
    this._portal = portal

    // render children to portal
    this._renderPortal(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this._renderPortal(nextProps)
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this._portal)
    this._portal.parentNode.removeChild(this._portal)
  }

  _renderPortal(props) {
    const { className, style, getRef, onMount } = this.props
    const child = React.Children.only(props.children)
    const component = ReactDOM.unstable_renderSubtreeIntoContainer(
      this, child, this._portal, onMount
    )

    // take care of any classes or styles passed in
    if(className) {
      this._portal.className = className
    }
    if(style) {
      Object.keys(style).forEach(prop =>
        this._portal.style[prop] = style[prop]
      )
    }

    // we can't use traditional refs with portals
    // so we pass our newly created ref back up
    getRef(component)
  }

  render() {
    return null
  }
}

export default Travel