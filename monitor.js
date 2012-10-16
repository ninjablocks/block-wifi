var 
	exec = require('child_process').exec
	, opts = { timout : 10000 }
	, wifiScan = require('./bin/wifi_scan')
	, deviceCheck = require('./bin/device_check')
	, ifaceUp = require('./bin/iface_up')
	, ifaceDown = require('./bin/iface_down')
	, ifaceCheck = require('./bin/iface_check')
	, writeConfig = require('./bin/write_config')
	, restartSupplicant = require('./bin/restart_supplicant')
	, syncDisk = require('./bin/sync_disk')
	, actions = {

		"wifiScan" : wifiScan
		, "ifaceUp" : ifaceUp
		, "ifaceDown" : ifaceDown
		, "ifaceCheck" : ifaceCheck
		, "deviceCheck" : deviceCheck
		, "writeConfig" : writeConfig
		, "restartSupplicant" : restartSupplicant
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
