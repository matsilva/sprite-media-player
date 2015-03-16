var smpDispatcher = require('../dispatcher/smpDispatcher');
var smpConstants = require('../constants/smpConstants');

var smpActions = {
  play: function() {
    ProjekticDispatcher.handleAction({
      actionType: smpConstants.PLAY,
    });
  },
  pause: function() {
    ProjekticDispatcher.handleAction({
      actionType: smpConstants.PAUSE,
    });
  },
  stop: function() {
    ProjekticDispatcher.handleAction({
      actionType: smpConstants.STOP,
    });
  },
  loop: function(active) {
    ProjekticDispatcher.handleAction({
      actionType: smpConstants.LOOP,
      data: active,
    });
  },
  rewind: function() {
    ProjekticDispatcher.handleAction({
      actionType: smpConstants.REWIND,
    });
  },
  reverse: function() {
    ProjekticDispatcher.handleAction({
      actionType: smpConstants.REVERSE,
    });
  },
  forward: function() {
    ProjekticDispatcher.handleAction({
      actionType: smpConstants.FORWARD,
    });
  },
  spriteLoaded: function(spriteNode, fps, frames, callbacks) {
    ProjekticDispatcher.handleAction({
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
