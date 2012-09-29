var 
	exec = require('child_process').exec
	, opts = { timeout : 100000 }
;

var error = function(err) {

	process.send({ 'action' : 'resetWifi', 'error' : err });
};

var down = function() { 

	exec('sudo ifdown wlan0', opts, kill);
};

var kill = function(err, stdout, stderr) {

	if(err) { return error(err); }

	exec('sudo killall -q -s SIGHUP wpa_supplicant', opts, up);
};

var up = function(err, stdout, stderr) {

	if(err) { return error(err); }

	exec('sudo ifup wlan0', opts, done);
};

var done = function(err, stdout, stderr) {

	if(err) { return error(err); }

	process.send({ 'action' : 'resetWifi', 'data' : true });
};

module.exports = down;
