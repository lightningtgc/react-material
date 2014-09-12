/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Colors = require('../style/Colors');

var CircleShadow = require('./CircleShadow');

var RadioButton = React.createClass({

  normalStyle: ReactStyle(function normalStyle(){
    return {
      webkitTapHighlightColor: 'rgba(0,0,0,0)',
      cursor: 'pointer',
      position: 'relative',

      display: 'block',
      outline: 'none'
    };
  }),

  childStyle: ReactStyle(function childStyle(){
    return {
      paddingLeft: 16
    };
  }),

  childBigStyle: ReactStyle(function childStyle(){
    return {
      paddingLeft: 32
    };
  }),

  offButtonStyle: ReactStyle(function offButtonStyle(){
    return {
      border: 'solid 2px',
      borderColor: Colors.grey.P700,
      borderRadius: '50%',
      height: 16,
      left: 0,
      position: 'absolute',
      top: 0,
      width: 16
    };
  }),

  onButtonStyle: ReactStyle(function onButtonStyle(){
    return {
      backgroundColor: Colors.grey.P700,
      borderRadius: '50%',
      height: 20,
      left: 0,
      position: 'absolute',
      top: 0,
      transform: 'scale(0)',
      transition: 'transform ease 0.28s',
      width: 20,
      willChange: 'transform'
    };
  }),

  onButtonFillStyle: ReactStyle(function onButtonFillStyle(){
    return {
      transform: 'scale(.6)'
    };
  }),

  circleContainerStyle: ReactStyle(function circleContainerStyle(){
    return {
      position: 'absolute',
      width: 16,
      height: 16,
      top: 2,
      left: 2
    };
  }),

  isChecked: false,

  getInitialState: function() {
    var checked = this.props.checked || false;
    this.isChecked = checked;
    return {
      checked: checked
    };
  },

  render: function() {
    var props = this.props;
    var checked = this.state.checked || props.checked;
    var normalStyles = [this.normalStyle()];
    if (props.styles) {
      normalStyles = normalStyles.concat(props.styles);
    }

    var onButtonStyle = [this.onButtonStyle()];
    if (props.onButtonStyle) {
      onButtonStyle = onButtonStyle.concat(props.onButtonStyle);
    }
    if (checked){
      onButtonStyle.push(this.onButtonFillStyle());
    }

    return <div tabIndex={0} styles={normalStyles} onClick={this.onClick} onMouseDown={this.onMouseDown}>
      <div styles={this.offButtonStyle()} />
      <div styles={onButtonStyle} />
      <div styles={this.circleContainerStyle()}>
        <CircleShadow styles={props.onButtonStyle} active={this.state.mouseDown} />
      </div>
      <div styles={props.children && props.children.length ? this.childBigStyle() : this.childStyle()}>
        {props.children}
      </div>
    </div>;
  },

  onClick: function() {
    var props = this.props;
    var position = 0;
    var el = this.getDOMNode();
    while(el = el.previousSibling) {
      position++
    }
    var state = this.state;
    if (props.onChange) {
      props.onChange({checked: state.checked, ref: this, position: position});
      return;
    }

    var isChecked = !state.checked;
    this.setState({checked: isChecked});
    this.isChecked = isChecked;
  },

  onMouseDown: function(){
    this.setState({mouseDown: !this.state.checked});
  }

});

module.exports = RadioButton;