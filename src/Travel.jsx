import React, { Component, Children, PropTypes, createElement, cloneElement } from 'react'
import ReactDOM from 'react-dom'
import shallowCompare from 'react-addons-shallow-compare'

const noopProp = func => func

class Travel extends Component {
  static propTypes = {
    to: PropTypes.any,
    tag: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.any,
    style: PropTypes.object,
    children: PropTypes.element,
    getNode: PropTypes.func,
    onMount: PropTypes.func,
    onUpdate: PropTypes.func,
    onUnmount: PropTypes.func
  }

  static defaultProps = {
    to: document.body,
    tag: 'div',
    getNode: noopProp,
    onMount: noopProp,
    onUpdate: noopProp,
    onUnmount: noopProp
  }

  componentDidMount() {
    const { to, tag, onMount } = this.props
    const parent = (typeof to === 'string') ? document.querySelector(to) : to
    const portal = document.createElement(tag)

    // render to desired location
    parent.appendChild(portal)

    // store the node to allow work to be done on it
    this._node = onMount(portal) || portal

    // store portal to remove later
    this._portal = portal

    // render children to portal
    this._renderPortal(this.props, true)
  }

  componentWillReceiveProps(nextProps) {
    this._renderPortal(nextProps)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  componentWillUnmount() {
    // we have to unmount manually
    ReactDOM.unmountComponentAtNode(this._portal)

    // allow cleanup of any DOM work done by user
    this.props.onUnmount(this._node)

    // clean up and remove the portal
    this._portal.parentNode.removeChild(this._portal)
  }

  getNode() {
    return this._portal
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
      Object.keys(style).forEach(prop =>
        this._portal.style[prop] = style[prop]
      )
    }

    // render child into the portal
    const component = ReactDOM.unstable_renderSubtreeIntoContainer(
      this, child, this._portal, () => {
        // assign new node if updated
        if(!onMount) {
          this._node = onUpdate(this._node) || this._node
        }

        // pass node back up if needed for DOM calculations
        getNode(this._portal)
      }
    )
  }

  render() {
    return null
  }
}

export default Travel