var 
	exec = require('child_process').exec
	, opts = { timeout : 100000 }
	, killall = 'sudo killall -q -s SIGHUP wpa_supplicant'
;

var error = function(err) {

	process.send({ 'action' : 'restartSupplicant', 'error' : err });	
};

var kill = function() {

	exec(killall, opts, done);
};

var done = function(err, stdout, stderr) {

	if(err) { return error(err); }

	process.send({ 'action' : 'restartSupplicant', 'data' : true });
};

module.exports = kill;
