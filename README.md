## React Travel

[![npm version](https://badge.fury.io/js/react-travel.svg)](https://badge.fury.io/js/react-travel)
[![Dependency Status](https://david-dm.org/souporserious/react-travel.svg)](https://david-dm.org/souporserious/react-travel)

Your subtree should be able to travel into another top-level tree.

## Example
```js
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
    Even works with third party dialogs!
  </div>
</Travel>
```

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

React style prop. Accepts an object of styles that are applied to the portal. Note that values require their respective unit applied i.e `style={{padding: '12px'}}`.

#### `children`: PropTypes.element

Accepts a single React element or component.

#### `onMount`: PropTypes.func
#### `onUpdate`: PropTypes.func
#### `onUnmount`: PropTypes.func

All tie into React's life cycle methods. Returns portal node with any work done to it.
