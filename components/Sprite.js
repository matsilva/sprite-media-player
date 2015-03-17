var React = require('react');
var smpStores = require('../flux/stores/smpStores');
var smpConstants = require('../flux/constants/smpConstants');
var smpActions = require('../flux/actions/smpActions');

var Sprite = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired,
    width: React.PropTypes.string.isRequired,
    frames: React.PropTypes.number.isRequired,
    fps: React.PropTypes.number.isRequired,
    callbacks: React.PropTypes.object,
  },
  getInitialState: function() {
    return {
      isLoaded: smpStores.isLoaded(),
      visible: smpStores.isVisible(),
      calculatedHeight: smpStores.getCalculatedHeight(),
      offsetTop: smpStores.getOffsetTop(),
    };
  },
  componentDidMount: function() {

    var spriteNode = this.refs.sprite.getDOMNode();
    smpStores.addChangeListener(this._onChange);

    spriteNode.onload = function() {
      smpActions.spriteLoaded(spriteNode, this.props.fps, this.props.frames, this.props.callbacks);
    }.bind(this);
  },
  componentWillUnmount: function() {

    smpStores.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      isLoaded: smpStores.isLoaded(),
      visible: smpStores.isVisible(),
      calculatedHeight: smpStores.getCalculatedHeight(),
      offsetTop: smpStores.getOffsetTop(),
    });
  },
  render: function() {
    var spriteContainerStyles = {
      width: this.props.width,
      height: this.state.calculatedHeight + "px",
      overflow: "hidden",
    };
    var spriteStyles = {
      margin: this.state.offsetTop + "px 0 0 0",
    };

    return (
      <div className="sprite-sprite" style={spriteContainerStyles}>
        <img style={spriteStyles} ref="sprite" src={this.props.url} />
      </div>
    );
  }

});
module.exports = Sprite;
