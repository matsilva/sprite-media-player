var React = require('react');
var smpStores = require('../flux/stores/smpStores');
var smpConstants = require('../flux/constants/smpConstants');
var smpActions = require('../flux/actions/smpActions');

var PlayerControls = React.createClass({
  getInitialState: function() {
    return {
      loopActive: false,
      reverseActive: false,
      forwardActive: false,
    };
  },
  triggerPlay: function() {
    smpActions.play();
  },
  triggerPause: function() {
    smpActions.pause();
  },
  triggerStop: function() {
    smpActions.stop();
  },
  triggerReverse: function() {
    smpActions.reverse();
    this.setState({
      reverseActive: true,
      forwardActive: false,
    });
  },
  triggerForward: function() {
    smpActions.forward();
    this.setState({
      reverseActive: false,
      forwardActive: true,
    });
  },
  triggerLoop: function() {
    smpActions.loop(!this.state.loopActive);
    this.setState({
      loopActive: !this.state.loopActive,
    });
  },
  render: function() {
    var controlStyles = {
      zIndex: 1
    };

    var loopBtnStyles = this.state.loopActive ? { backgroundColor: "#e6e6e6", borderColor: "#adadad" } : {};
    var loopBtnClass = this.state.loopActive ? "fa fa-circle-o-notch fa-spin" : "fa fa-circle-o-notch";
    var forwardBtnStyles = this.state.forwardActive ? { backgroundColor: "#e6e6e6", borderColor: "#adadad" } : {};
    var reverseBtnStyles = this.state.reverseActive ? { backgroundColor: "#e6e6e6", borderColor: "#adadad" } : {};

    return (
      <div style={controlStyles} className="playerControls text-center">
        <div className="btn-group" role="group">
          <button type="button" onClick={this.triggerPlay} className="btn btn-default"><i className="fa fa-play"></i></button>
          <button type="button" onClick={this.triggerPause} className="btn btn-default"><i className="fa fa-pause"></i></button>
          <button type="button" onClick={this.triggerStop} className="btn btn-default"><i className="fa fa-stop"></i></button>
          <button type="button" style={reverseBtnStyles} onClick={this.triggerReverse} className="btn btn-default"><i className="fa fa-backward"></i></button>
          <button type="button" style={forwardBtnStyles} onClick={this.triggerForward} className="btn btn-default"><i className="fa fa-forward"></i></button>
          <button type="button" style={loopBtnStyles} onClick={this.triggerLoop} className="btn btn-default"><i className={loopBtnClass}></i></button>
        </div>
      </div>
    );
  }

});
module.exports = PlayerControls;
