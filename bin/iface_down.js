var 
	exec = require('child_process').exec
	, os = require('os')
	, opts = { timeout : 100000 }
        , wlan = Object.keys(os.networkInterfaces()).filter(function(el) {
                return el.indexOf("wlan") >= 0;
                })[0] || "wlan0"
;

var error = function(err) {

	console.log("Error taking interface "+wlan+" down.", err);
	process.send({ 'action' : 'ifaceDown', 'error' : err });
};

var down = function() { 
	
	console.log("Taking interface "+wlan+" down...")
	exec('sudo ifconfig '+wlan+' down', opts, done);
};

var done = function(err, stdout, stderr) {

	if(err) { 

		return error(err); 
	}

	console.log("Interface "+wlan+" down.");
	process.send({ 'action' : 'ifaceDown', 'data' : true });
};

module.exports = down;
