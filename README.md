# sprite-media-player


##Options
* sprite - Url to the sprite 
* width - Specify the width of the media player in pixels or percentage 
* frames - Specify how many frames the sprite contains
* fps - Specify frames per second for playback
* callbacks - Object containing various callbacks. See Callback API below.

##Callback API
```
var callbacks = {
  onLoad: function() {
    console.log("I loaded");
  },
  beforePlay: function() {
    console.log("before I played");
  },
  onPlay: function() {
    console.log("I played");
  },
  onReverse: function() {
    console.log("I reversed");
  },
  onForward: function() {
    console.log("I forwardeded");
  },
  beforePause: function() {
    console.log("before I paused");
  },
  onPause: function() {
    console.log("I paused");
  },
  beforeStop: function() {
    console.log("before I stopped");
  },
  onStop: function() {
    console.log("I stopped");
  },
  onLoop: function() {
    console.log("I loop");
  },
};

<SpriteMediaPlayer callbacks={callbacks} />
```
