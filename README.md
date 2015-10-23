## React Travel 1.0.0

Simple, unopinionated, React portal that renders it's subtree into a desired container.

## Props

#### `to`: PropTypes.node

What node the portal is rendered to, defaults to `document.body`.

#### `tag`: PropTypes.string

What tag to use for the portal, defaults to `div`.

#### `id`: PropTypes.string

React id prop.

#### `className`: PropTypes.any

React className prop.

#### `style`: PropTypes.object

React style prop. Accepts an object of styles that are applied to the portal.

#### `children`: PropTypes.element

Accepts a single React element or component

#### `getNode`: PropTypes.func

Since we can't use traditional refs, use this to get a reference to the portal node.