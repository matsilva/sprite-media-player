var smpDispatcher = require('../dispatcher/smpDispatcher');
var smpConstants = require('../constants/smpConstants');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('react/lib/Object.assign');

var CHANGE_EVENT = "change";

var _smpStore = {
  loaded: false,
  visible: false,
  calculatedHeight: 0,
  frame: 1,
  offsetTop: 0,
  fps: 0,
  direction: "forward",
  loop: false,
  status: "stop",
  nextFrame: function() {
    if (this.direction === "forward") {
      this.frame++;
      this.offsetTop = -(this.frame * this.calculatedHeight);
    } else if (this.direction === "reverse") {
      this.frame--;
      this.offsetTop = -(this.frame * this.calculatedHeight);
    }
  },
};

var registerCallbacks = function (callbacks){
  //TODO add debounce to each of the callbacks
  if (callbacks) {
    if (callbacks.onLoad && typeof callbacks.onLoad === 'function') {
      _smpStore.onLoad = callbacks.onLoad;
    }
    if (callbacks.onLoop && typeof callbacks.onLoop === 'function') {
      _smpStore.onLoop = callbacks.onLoop;
    }
    if (callbacks.beforePlay && typeof callbacks.beforePlay === 'function') {
      _smpStore.beforePlay = callbacks.beforePlay;
    }
    if (callbacks.onPlay && typeof callbacks.onPlay === 'function') {
      _smpStore.onPlay = callbacks.onPlay;
    }
    if (callbacks.beforePause && typeof callbacks.beforePause === 'function') {
      _smpStore.beforePause = callbacks.beforePause;
    }
    if (callbacks.onPause && typeof callbacks.onPause === 'function') {
      _smpStore.onPause = callbacks.onPause;
    }
    if (callbacks.beforeStop && typeof callbacks.beforeStop === 'function') {
      _smpStore.beforeStop = callbacks.beforeStop;
    }
    if (callbacks.onStop && typeof callbacks.onStop === 'function') {
      _smpStore.onStop = callbacks.onStop;
    }
    if (callbacks.beforeReverse && typeof callbacks.beforeReverse === 'function') {
      _smpStore.beforeReverse = callbacks.beforeReverse;
    }
    if (callbacks.onReverse && typeof callbacks.onReverse === 'function') {
      _smpStore.onReverse = callbacks.onReverse;
    }
    if (callbacks.beforeForward && typeof callbacks.beforeForward === 'function') {
      _smpStore.beforeForward = callbacks.beforeForward;
    }
    if (callbacks.onForward && typeof callbacks.onForward === 'function') {
      _smpStore.onForward = callbacks.onForward;
    }
  }
};
  

var smpStore = objectAssign({}, EventEmitter.prototype, {

  addChangeListener: function(callback) {

    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener:function(callback) {

    this.removeListener(CHANGE_EVENT, callback);
  },
  isLoaded: function() {
    
    return _smpStore.loaded;
  },
  isVisible: function() {
    
    return _smpStore.visible;
  },
  getCalculatedHeight: function() {
    
    return _smpStore.calculatedHeight;
  },
  getOffsetTop: function() {
    
    return _smpStore.offsetTop;
  },
  setSpriteLoaded: function() {
    
    _smpStore.loaded = true;
    return;
  },

});

smpDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.actionType) {
    case smpConstants.PLAY:
      if (!_smpStore.visible) {
        return console.log("Not ready yet");
      }

      _smpStore.status = "play";

      if (_smpStore.frame === 1 && _smpStore.direction === "reverse") {
        _smpStore.direction = "forward";
      }
      
      if (_smpStore.beforePlay) {

        _smpStore.beforePlay();
      }

      var play = setInterval(function() {

        //TODO cleanup conditionals and implement abstraction
        if (_smpStore.loop && _smpStore.frame === (_smpStore.frames - 1) && _smpStore.direction === "forward" ) {
          _smpStore.frame -= _smpStore.frames -1;
        } else if (_smpStore.loop && _smpStore.frame === 1 && _smpStore.direction === "reverse" ) {
          _smpStore.frame = _smpStore.frames -1;

        }

        if ((_smpStore.direction !== "reverse" && _smpStore.frame) === _smpStore.frames -1 || 
            _smpStore.status !== "play" ||
            (_smpStore.frame === 1 && _smpStore.direction === "reverse")) {

          switch (_smpStore.status) {
            case 'stop':
              
              if (_smpStore.onStop) {

                _smpStore.onStop();
              }
              break;

            case 'pause':
              
              if (_smpStore.onPause) {

                _smpStore.onPause();
              }
              break;

            default:
              return true;
          }

          
          clearInterval(play);
          return;
        }
        _smpStore.nextFrame();
        smpStore.emit(CHANGE_EVENT);
      }, 500/_smpStore.fps);

      if (_smpStore.onPlay) {

        _smpStore.onPlay();
      }

      break;
    
    case smpConstants.PAUSE:

      if (_smpStore.beforePause) {

        _smpStore.beforePause();
      }

      _smpStore.status = "pause";
      break;
    
    case smpConstants.STOP:

      if (_smpStore.beforeStop) {

        _smpStore.beforeStop();
      }

      _smpStore.status = "stop";
      _smpStore.frame = _smpStore.direction === "forward" ? -1 : 2;
      _smpStore.nextFrame();
      smpStore.emit(CHANGE_EVENT);
      break;
    
    case smpConstants.LOOP:
      if (_smpStore.onLoop) {

        _smpStore.onLoop();
      }
      _smpStore.loop = action.data;
      smpStore.emit(CHANGE_EVENT);
      break;
    
    case smpConstants.REWIND:
      //NOT IMPLEMENTED
      smpStore.emit(CHANGE_EVENT);
      break;
    
    case smpConstants.REVERSE:

      if (_smpStore.onReverse) {

        _smpStore.onReverse();
      }
      _smpStore.direction = "reverse";
      smpStore.emit(CHANGE_EVENT);
      break;

    case smpConstants.FORWARD:

      if (_smpStore.onForward) {

        _smpStore.onForward();
      }

      _smpStore.direction = "forward";
      smpStore.emit(CHANGE_EVENT);
      break;
    
    case smpConstants.SPRITE_LOADED:
      _smpStore.load = true;
      _smpStore.visible = true;
      _smpStore.calculatedHeight = action.data.spriteNode.height / action.data.frames;
      _smpStore.fps = action.data.fps;
      _smpStore.frames = action.data.frames;

      registerCallbacks(action.data.callbacks);
      
      if (_smpStore.onLoad) {

        _smpStore.onLoad();
      }

      smpStore.emit(CHANGE_EVENT);
      break;
    
    default:
      return true;
  }

});

module.exports = smpStore;
