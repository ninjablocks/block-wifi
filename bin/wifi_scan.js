var 
	exec = require('child_process').exec
	, parser = require(__dirname + '/../lib/iwlist-parser')
	, cells = []
	, retries = 0
	, opts = { timeout : 100000 }
;

function error(err) {

	process.send({ 'action' : 'wifiScan', 'error' : err });	
};

/**
 * Split output lines into array & feed to parser
 */
function read(err, stdout, stderr) {
	
	if(err) {

		return error(err);
	}	

	stdout
		.split('\n')
		.map(parse)
	;

	if(cells.length == 0) {


		if(++retries < 4) {

			return scan();
		}
		
		retries == 0;
		return error("No networks found.");
	}

	send();
};

function send() {

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

function scan() {

	cells = [];
	exec('iwlist scan', opts, read);
};

module.exports = scan;
