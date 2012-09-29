var 
	exec = require('child_process').exec
	, parser = require(__dirname + '/../lib/iwlist-parser')
	, cells = []
	, opts = { timeout : 100000 }
;

/**
 * Split output lines into array & feed to parser
 */
function read(err, stdout, stderr) {
	
	if(err) {

		return process.send({ 'action' : 'wifiScan', 'error' : err });
	}	

	stdout
		.split('\n')
		.map(parse)
	;

	process.send({ 'action' : 'wifiScan', 'data' : cells });
};

/**
 * Parse matching lines into cells list
 */
function parse(line, index, list) {

	parser.map(function(rule) {

		if(line.match(rule.pattern)) {

			rule.handle.call(line, cells);
		}	
	});
};

module.exports = function() { cells = []; exec('iwlist scan', opts, read) };
