var smpDispatcher = require('../dispatcher/smpDispatcher');
var smpConstants = require('../constants/smpConstants');

var smpActions = {
  play: function() {
    smpDispatcher.handleAction({
      actionType: smpConstants.PLAY,
    });
  },
  pause: function() {
    smpDispatcher.handleAction({
      actionType: smpConstants.PAUSE,
    });
  },
  stop: function() {
    smpDispatcher.handleAction({
      actionType: smpConstants.STOP,
    });
  },
  loop: function(active) {
    smpDispatcher.handleAction({
      actionType: smpConstants.LOOP,
      data: active,
    });
  },
  rewind: function() {
    smpDispatcher.handleAction({
      actionType: smpConstants.REWIND,
    });
  },
  reverse: function() {
    smpDispatcher.handleAction({
      actionType: smpConstants.REVERSE,
    });
  },
  forward: function() {
    smpDispatcher.handleAction({
      actionType: smpConstants.FORWARD,
    });
  },
  spriteLoaded: function(spriteNode, fps, frames, callbacks) {
    smpDispatcher.handleAction({
      actionType: smpConstants.SPRITE_LOADED,
      data: {
        spriteNode: spriteNode,
        fps: fps,
        frames: frames,
        callbacks: callbacks,
      },
    });
  },
};

module.exports = smpActions;
