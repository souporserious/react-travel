## React Travel 1.0.0

Your subtree should be able to travel into another top-level tree.

## Props

#### `to`: PropTypes.any

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