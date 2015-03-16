var React = require('react');
var Player = require('./SpriteMediaPlayer.js');

var App = React.createClass({
  render: function() {
    var sampleSprite = "../test/img/le-shoe.png";

    var callbacks = {
      onLoad: function() {
        
        console.log("I loaded");
      },
      onPlay: function() {
        console.log("I played");
      },
      onReverse: function() {
        console.log("I reversed");
      },
      onPause: function() {
        console.log("I paused");
      },
      onStop: function() {
        console.log("I stopped");
      },
    };

    return (
      <div className="container">
        <div className="row">
         <div className="col-sm-4 col-sm-offset-4">
            <Player
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
