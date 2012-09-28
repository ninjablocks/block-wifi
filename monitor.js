var 
	exec = require('child_process').exec
	, opts = { timout : 10000 }
	, wifiScan = require('./bin/wifi_scan')
	, deviceCheck = require('./bin/device_check')
	, writeConfig = require('./bin/write_config')
	, actions = {

		"wifiScan" : wifiScan
		, "deviceCheck" : deviceCheck
		, "writeConfig" : writeConfig
		, "init" : function() {

			handleMessage({ action : "wifiScan" });
			handleMessage({ action : "deviceCheck" });
		}
	}
;

function handleMessage(dat) {

	if(!dat) { return; }
	
	var action = dat.action || undefined;
	if((actions[action]) && typeof (actions[action] == "function")) {

		actions[action]();
	}	
};

process.on('message', handleMessage);