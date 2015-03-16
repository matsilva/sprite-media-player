var React = require('react');
var Sprite = require('./Sprite.js');
var PlayerControls = require('./PlayerControls.js');


var Player = React.createClass({
  propTypes: {
    sprite: React.PropTypes.string.isRequired,
    width: React.PropTypes.string.isRequired,
    frames: React.PropTypes.number.isRequired,
    fps: React.PropTypes.number.isRequired,
    callbacks: React.PropTypes.object,
  },
  render: function() {
    var playerStyles = {
      width: this.props.width,
    };
    return (
      <div className="sprite-media-player" style={playerStyles}>
        <Sprite 
        width={this.props.width}
        frames={this.props.frames}
        fps={this.props.fps}
        callbacks={this.props.callbacks}
        url={this.props.sprite} />
        <PlayerControls/>
      </div>
    );
  }

});
module.exports = Player;
