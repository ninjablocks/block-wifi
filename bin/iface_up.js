var
	exec = require('child_process').exec
	, opts = { timeout : 100000 }
;

var error = function(err) {

	console.log("Error bringing interface up.", err);
	process.send({ 'action' : 'ifaceUp', 'error' : err });
};

var up = function(iface) {

	console.log("Bringing interface %s up...", iface);
	exec('sudo ifconfig ' + iface + ' up', opts, done);
};

var done = function(err, stdout, stderr) {

	if(err) {

		return error(err);
	}

	console.log("Interface up.");
	process.send({ 'action' : 'ifaceUp', 'data' : true });
};

module.exports = up;
