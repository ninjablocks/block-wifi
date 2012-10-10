var 
	exec = require('child_process').exec
	, opts = { timout : 10000 }
	, wifiScan = require('./bin/wifi_scan')
	, deviceCheck = require('./bin/device_check')
	, ifaceCheck = require('./bin/iface_check')
	, writeConfig = require('./bin/write_config')
	, resetWifi = require('./bin/reset_wifi')
	, syncDisk = require('./bin/sync_disk')
	, actions = {

		"wifiScan" : wifiScan
		, "deviceCheck" : deviceCheck
		, "writeConfig" : writeConfig
		, "ifaceCheck" : ifaceCheck
		, "resetWifi" : resetWifi
		, "init" : function() {

			deviceCheck();
			ifaceCheck();
			wifiScan();

			setInterval(deviceCheck, 10000);
			setInterval(ifaceCheck, 10000);
			setInterval(wifiScan, 10000);
		}
	}
;

function handleMessage(dat) {

	if(!dat) { return; }
	
	var action = dat.action || undefined;
	if((actions[action]) && typeof actions[action] == "function") {

		actions[action](dat.data || null);
	}	
};

process.on('message', handleMessage);
