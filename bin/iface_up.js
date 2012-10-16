var 
	exec = require('child_process').exec
	, opts = { timeout : 100000 }
;

var error = function(err) {

	process.send({ 'action' : 'ifaceUp', 'error' : err });
};

var up = function() { 
	
	exec('sudo ifup wlan0', opts, done);
};

var done = function(err, stdout, stderr) {

	if(err) { return error(err); }

	process.send({ 'action' : 'ifaceUp', 'data' : true });
};

module.exports = up;
