'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactLibShallowCompare = require('react/lib/shallowCompare');

var _reactLibShallowCompare2 = _interopRequireDefault(_reactLibShallowCompare);

var _reactLibCSSPropertyOperations = require('react/lib/CSSPropertyOperations');

var _reactLibCSSPropertyOperations2 = _interopRequireDefault(_reactLibCSSPropertyOperations);

var Travel = (function (_Component) {
  _inherits(Travel, _Component);

  function Travel() {
    _classCallCheck(this, Travel);

    _get(Object.getPrototypeOf(Travel.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Travel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props;
      var tag = _props.tag;
      var to = _props.to;

      var parent = typeof to === 'string' ? document.querySelector(to) : to;
      var portal = document.createElement(tag);

      // render to desired location
      parent.appendChild(portal);

      // store portal to remove later
      this._portal = portal;

      // render children to portal
      this._renderPortal(this.props);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var shouldUpdate = (0, _reactLibShallowCompare2['default'])(this, nextProps, nextState);

      if (shouldUpdate) {
        this._renderPortal(nextProps);
      }

      return shouldUpdate;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // we have to unmount manually
      _reactDom2['default'].unmountComponentAtNode(this._portal);

      // clean up and remove the portal
      this._portal.parentNode.removeChild(this._portal);
    }
  }, {
    key: '_renderPortal',
    value: function _renderPortal(props) {
      var id = props.id;
      var className = props.className;
      var style = props.style;
      var getNode = props.getNode;

      var child = _react2['default'].Children.only(props.children);

      // handle props passed into node
      if (id) {
        this._portal.id = id;
      }
      if (className) {
        this._portal.className = className;
      }
      if (style) {
        _reactLibCSSPropertyOperations2['default'].setValueForStyles(this._portal, style);
      }

      // render child into the portal
      _reactDom2['default'].unstable_renderSubtreeIntoContainer(this, child, this._portal);

      // we can't use traditional refs with portals
      // so we pass our newly created node back up
      getNode(this._portal);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }], [{
    key: 'propTypes',
    value: {
      to: _react.PropTypes.node,
      tag: _react.PropTypes.string,
      id: _react.PropTypes.string,
      className: _react.PropTypes.any,
      style: _react.PropTypes.object,
      children: _react.PropTypes.element,
      getNode: _react.PropTypes.func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      to: document.body,
      tag: 'div',
      getNode: function getNode() {
        return null;
      }
    },
    enumerable: true
  }]);

  return Travel;
})(_react.Component);

exports['default'] = Travel;
module.exports = exports['default'];