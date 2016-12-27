'use strict';

import React, { Component, PropTypes } from 'react';
import { Image, Platform, Dimensions, StyleSheet } from 'react-native';

const IMG_CENTER_MODE = Platform.OS === 'ios' ? 'center' : 'contain';

class Ikon extends Component {

  constructor(props) {
    super(props);

    this.iconSet = __iconSet;

    this.state = {
        style: null,
        resizeMode: null,
        width: null,
        height: null,
        source: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    const props = nextProps;
    const {disabled, name, style} = props;

    this.iconSet = __iconSet;

    const resizeMode = props.resizeMode ? props.resizeMode : this.traverseIconSet(name, 'resizeMode');
    const autoScale = props.autoScale ? props.autoScale : this.traverseIconSet(name, 'autoScale');

    const doScale = (value) => {
      return autoScale ? Ikon.__normalize(value) : value;
    }

    const width = doScale( props.width ? props.width : this.traverseIconSet(name, 'width') );
    const height = doScale( props.height ? props.height : this.traverseIconSet(name, 'height') );
    const source = props.source ? props.source : this.traverseIconSet(name, 'source');

    let _style = style ? StyleSheet.flatten(style) : {};
    _style = {..._style, width, height};

    const transform = this.traverseIconSet(name, 'transform');
    if(transform) {
      _style = {..._style, transform};
    }

    if(!!disabled) {
      let disabledStyle = this.traverseIconSet(name, '$disabled')
      if(!disabledStyle) {
        disabledStyle = {opacity: 0.5};
      }
      _style = [..._style, disabledStyle];
    }

    this.setState({
        style: _style,
        resizeMode: resizeMode ? resizeMode : IMG_CENTER_MODE,
        width,
        height,
        source
    })
  }

  // register an IconSet
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

  // try to find a value while traversing up the iconSet structure
  traverseIconSet(name, property) {
    let obj = Ikon.__resolvePropertyByKey(this.iconSet, name);
    while(obj) {
      if(obj[property]) {
        return obj[property];
      }

      const p = name.lastIndexOf('.');
      if(!p) return null;
      name = name.substr(0, p);
      obj = Ikon.__resolvePropertyByKey(this.iconSet, name);
    }
    return null;
  }

  // traverse down a nested object to resolve the 'path'
  static __resolvePropertyByKey(obj, path) {
      return path.split('.').reduce(function(prev, curr) {
          return prev ? prev[curr] : undefined
      }, obj)
  }

  static __normalize(value : number) {
    return Math.round(__scale * value);
  }

}

const __scale = Dimensions ? Dimensions.get('window').width / 375 : 1;

// global iconSet
// assign your personal IconSet with Ikon.registerIconSet()
let __iconSet = null;

Ikon.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  resizeMode: PropTypes.string,
  autoScale: PropTypes.bool,
}

Ikon.defaultProps = {
}

module.exports = Ikon;
