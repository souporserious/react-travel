import React, { Component, Children, PropTypes, createElement, cloneElement } from 'react'
import ReactDOM from 'react-dom'
import shallowCompare from 'react/lib/shallowCompare'
import CSSPropertyOperations from 'react/lib/CSSPropertyOperations'

class Travel extends Component {
  static propTypes = {
    to: PropTypes.node,
    tag: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.any,
    style: PropTypes.object,
    children: PropTypes.element,
    getNode: PropTypes.func
  }

  static defaultProps = {
    to: document.body,
    tag: 'div',
    getNode: () => null
  }

  componentDidMount() {
    const { tag, to } = this.props
    const parent = typeof to === 'string' ? document.querySelector(to) : to
    const portal = document.createElement(tag)

    // render to desired location
    parent.appendChild(portal)

    // store portal to remove later
    this._portal = portal

    // render children to portal
    this._renderPortal(this.props)
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

    // clean up and remove the portal
    this._portal.parentNode.removeChild(this._portal)
  }

  _renderPortal(props) {
    const { id, className, style, getNode } = this.props
    const child = React.Children.only(props.children)
    const component = ReactDOM.unstable_renderSubtreeIntoContainer(
      this, child, this._portal
    )

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

    // we can't use traditional refs with portals
    // so we pass our newly created node back up
    getNode(this._portal)
  }

  render() {
    return null
  }
}

export default Travel