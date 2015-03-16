//This file is used for example/index.html
var React = require('react');
var SpriteMediaPlayer = require('./SpriteMediaPlayer.js');

var App = React.createClass({
  render: function() {
    var sampleSprite = "../example/img/le-shoe.png";

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

    return (
      <div className="container">
        <div className="row">
         <div className="col-sm-4 col-sm-offset-4">
            <SpriteMediaPlayer
            width="384px"
            frames={75}
            fps={8}
            callbacks={callbacks}
            sprite={sampleSprite} 
            />
          </div>
        </div>
      </div>
    );
  }

});

React.render(
  <App />,
  document.getElementById('app')
);
