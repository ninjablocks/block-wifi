var
	exec = require('child_process').exec
	, opts = { timeout : 100000 }
;

var error = function(err) {

	console.log("Error taking interface down.", err);
	process.send({ 'action' : 'ifaceDown', 'error' : err });
};

var down = function(iface) {

	console.log("Taking interface " + iface + " down...")
	exec('sudo ifconfig ' + iface + ' down', opts, done);
};

var done = function(err, stdout, stderr) {

	if(err) {

		return error(err);
	}

	console.log("Interface down.");
	process.send({ 'action' : 'ifaceDown', 'data' : true });
};

module.exports = down;
