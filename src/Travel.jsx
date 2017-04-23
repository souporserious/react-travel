import React, { Component, Children, createElement, cloneElement } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

const noop = () => null

class Travel extends Component {
  static propTypes = {
    renderTag: PropTypes.string,
    renderTo: PropTypes.any,
    id: PropTypes.string,
    className: PropTypes.any,
    style: PropTypes.object,
    onMount: PropTypes.func,
    onUpdate: PropTypes.func,
    onUnmount: PropTypes.func
  }

  static defaultProps = {
    renderTag: 'div',
    renderTo: null,
    onMount: noop,
    onUpdate: noop,
    onUnmount: noop
  }

  _portalNode = null

  componentDidMount() {
    this._setupPortal()
    this._renderPortal()
  }

  componentDidUpdate() {
    this._renderPortal()
  }

  componentWillUnmount() {
    this._destroyPortal()
  }

  _getRenderToNode() {
    const { renderTo } = this.props
    if (typeof renderTo === 'string') {
      return document.querySelector(renderTo)
    } else {
      return renderTo || document.body
    }
  }

  _getComponent() {
    if (Children.count(this.props.children) === 1) {
      return Children.only(this.props.children)
    } else {
      return Children.toArray(this.props.children)[1]
    }
  }

  _setupPortal() {
    const { renderTag, onMount } = this.props
    const renderToNode = this._getRenderToNode()

    // create a node that we can stick our component in
    this._portalNode = document.createElement(renderTag)

    // append node to the render node
    renderToNode.appendChild(this._portalNode)

    // store the instance passed back to allow work to be done on it
    this._portalInstance = (typeof onMount === 'function')
      ? onMount(this._portalNode)
      : this._portalNode
  }

  _renderPortal() {
    const component = this._getComponent()
    // render component into the DOM
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this, component, this._portalNode, () => {
        // don't update until the subtree has finished rendering
        this._updatePortal()
      }
    )
  }

  _updatePortal() {
    const { id, className, style, onUpdate } = this.props

    if (id) {
      this._portalNode.id = id
    }

    if (className) {
      this._portalNode.className = className
    }

    if (style) {
      Object.keys(style).forEach(key => {
        this._portalNode.style[key] = style[key]
      })
    }

    if (typeof onUpdate === 'function') {
      this._portalInstance = onUpdate(this._portalInstance)
    }
  }

  _destroyPortal() {
    if (this._portalNode) {
      ReactDOM.unmountComponentAtNode(this._portalNode)
      this._portalNode.parentNode.removeChild(this._portalNode)
    }
    this._portalNode = null
  }

  render() {
    return null
  }
}

export default Travel
