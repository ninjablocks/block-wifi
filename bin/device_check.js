var 
	exec = require('child_process').exec
	, opts = { timeout : 10000 }
;

function read(err, stdout, stderr) {
	
	if(err) {

		return process.send({ 'action' : 'deviceCheck', 'error' : err });
	}

	var res = { 'action' : 'deviceCheck', data : false };
	/**
	 * Check for 802.11
	 */
	if(stdout.indexOf('802.11') >= 0) {

		res.data = true;
	}
	else if(stdout.indexOf('WLAN') >= 0) {
		
		res.data = true;
	}
	process.send(res);
};

module.exports = function() { exec('lsusb', opts, read) }