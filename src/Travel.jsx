import React, { Component, Children, PropTypes, createElement, cloneElement } from 'react'
import ReactDOM from 'react-dom'
import shallowCompare from 'react/lib/shallowCompare'
import CSSPropertyOperations from 'react/lib/CSSPropertyOperations'

const noopProp = func => func

class Travel extends Component {
  static propTypes = {
    to: PropTypes.any,
    tag: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.any,
    style: PropTypes.object,
    children: PropTypes.element,
    onMount: PropTypes.func,
    onUpdate: PropTypes.func,
    onUnmount: PropTypes.func
  }

  static defaultProps = {
    to: document.body,
    tag: 'div',
    onMount: noopProp,
    onUpdate: noopProp,
    onUnmount: noopProp
  }

  componentDidMount() {
    const { to, onMount } = this.props
    const parent = typeof to === 'string' ? document.querySelector(to) : to
    const portal = ReactDOM.findDOMNode(this)

    // render to desired location
    parent.appendChild(portal)

    // store the node to allow work to be done on it
    this._node = onMount(portal) || portal

    // store portal to remove later
    this._portal = portal

    // render children to portal
    this._renderPortal(this.props, true)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const shouldUpdate = shallowCompare(this, nextProps, nextState)

    if (shouldUpdate) {
      this._renderPortal(nextProps)
    }

    return shouldUpdate
  }

  componentWillUnmount() {
    // we have to unmount manually
    ReactDOM.unmountComponentAtNode(this._portal)

    // allow cleanup of any DOM work done by user
    this.props.onUnmount(this._node)

    // clean up and remove the portal
    this._portal.parentNode.removeChild(this._portal)
  }

  _renderPortal(props, onMount = false) {
    const { id, className, style, onUpdate, getNode } = props
    const child = React.Children.only(props.children)

    // handle props passed into node
    if (id) {
      this._portal.id = id
    }
    if (className) {
      this._portal.className = className
    }
    if (style) {
      CSSPropertyOperations.setValueForStyles(
        this._portal,
        style
      )
    }

    // render child into the portal
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this, child, this._portal
    )

    // assign new node if updated
    if(!onMount) {
      this._node = onUpdate(this._node) || this._node
    }
  }

  render() {
    return React.createElement(this.props.tag)
  }
}

export default Travel