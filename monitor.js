var 
	exec = require('child_process').exec
	, opts = { timout : 10000 }
	, wifiScan = require('./bin/wifi_scan')
	, deviceCheck = require('./bin/device_check')
;

function handleMessage(dat) {

	if(!dat) { return; }
	
	if(dat.action == "wifiScan") {

		wifiScan();
	}
	else if(dat.action == "deviceCheck") {

		deviceCheck();
	}
	else if(dat.action == "configCheck") {

		exec('./bin/config_check', opts, configCheck);
	}
	else if (dat.action == "init") {

		handleMessage({ action : "wifiScan" });
		handleMessage({ action : "deviceCheck" });
	}
};

process.on('message', handleMessage);