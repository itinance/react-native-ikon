'use strict';

import React, { Component, PropTypes } from 'react';
import { Image, Platform } from 'react-native';

class Ikon extends Component {

  constructor(props) {
    super(props);

    const {disabled, name, style} = this.props;

    let _style = style ? style : {};

    const attr = Ikon.__resolvePropertyByKey(__iconSet, name);
    if(!attr) {
      throw 'Attributes for Ikon not found!';
      return null;
    }

    const resizeMode = this.props.resizeMode ? this.props.resizeMode : (attr.resizeMode ? attr.resizeMode : IMG_CENTER_MODE);

    _style = [..._style, {width: attr.width, height: attr.height}];

    if(!!disabled) {
      let disabledStyle = Ikon.__resolvePropertyByKey(__iconSet, `${name}.$disabled`);
      if(!disabledStyle) {
        disabledStyle = {opacity: 0.5};
      }
      _style = [..._style, disabledStyle];
    }

    this.state = {
        style: _style,
        resizeMode: resizeMode ? resizeMode : IMG_CENTER_MODE,
        width: attr.width,
        height: attr.height,
        source: attr.source,
    }
  }

  static registerIconSet(iconSet) {
      __iconSet = iconSet;
  }

  render() {
    return (
      <Image resizeMode={this.state.resizeMode} width={this.state.width} height={this.state.height}
            source={this.state.source} style={this.state.style}>
      </Image>
    )
  }

  static __resolvePropertyByKey(obj, path) {
      return path.split('.').reduce(function(prev, curr) {
          return prev ? prev[curr] : undefined
      }, obj || self)
  }

}

// global iconSet
// assign your personal IconSet with Ikon.registerIconSet()
var __iconSet = null;

Ikon.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
  resizeMode: PropTypes.string,
}

Ikon.defaultProps = {
}

module.exports = Ikon;
