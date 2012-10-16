var 
	exec = require('child_process').exec
	, opts = { timeout : 100000 }
;

var error = function(err) {

	process.send({ 'action' : 'ifaceDown', 'error' : err });
};

var down = function() { 
	
	exec('sudo ifdown wlan0', opts, done);
};

var done = function(err, stdout, stderr) {

	if(err) { return error(err); }

	process.send({ 'action' : 'ifaceDown', 'data' : true });
};

module.exports = down;
