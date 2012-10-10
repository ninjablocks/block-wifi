var 
	exec = require('child_process').exec
	, opts = { timeout : 10000 }
;

function sync(err, stdout, stderr) {
	
	if(err) {

		return process.send({ 'action' : 'syncDisk', 'error' : err });
	}

	/**
	 * Delay before signaling a successful sync, just
	 * to make sure the system has a chance to write.
	 */
	setTimeout(function() {

		process.send({ 'action' : 'syncDisk', 'data' : true });
	}, 1000);
};

module.exports = function() { exec('sync', opts, sync) }