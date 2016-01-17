var 
	exec = require('child_process').exec
	, os = require('os')
	, opts = { timeout : 100000 }
        , wlan = Object.keys(os.networkInterfaces()).filter(function(el) {
                return el.indexOf("wlan") >= 0;
                })[0] || "wlan0"
;

var error = function(err) {
	
	console.log("Error bringing interface "+wlan+" up.", err);
	process.send({ 'action' : 'ifaceUp', 'error' : err });
};

var up = function() { 
	
	console.log("Bringing interface "+wlan+" up...");
	exec('sudo ifconfig '+wlan+' up', opts, done);
};

var done = function(err, stdout, stderr) {

	if(err) { 

		return error(err); 
	}

	console.log("Interface "+wlan+" up.");
	process.send({ 'action' : 'ifaceUp', 'data' : true });
};

module.exports = up;
