var Dispatcher = require('flux').Dispatcher;
var smpDispatcher = new Dispatcher();

smpDispatcher.handleAction = function(action){
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

module.exports = smpDispatcher;
