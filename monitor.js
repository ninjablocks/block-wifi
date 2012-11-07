var 
	exec = require('child_process').exec
	, opts = { timout : 10000 }
	, wifiScan = require('./bin/wifi_scan')
	, deviceCheck = require('./bin/device_check')
	, restartSupplicant = require('./bin/restart_supplicant')
	, restartBlock = require('./bin/restart_block')
	, writeConfig = require('./bin/write_config')
	, ifaceCheck = require('./bin/iface_check')
	, ifaceDown = require('./bin/iface_down')
	, syncDisk = require('./bin/sync_disk')
	, ifaceUp = require('./bin/iface_up')
	, actions = {

		"wifiScan" : wifiScan
		, "ifaceUp" : ifaceUp
		, "syncDisk" : syncDisk
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
	else {

		process.send({ 'error' : 'unknownAction', 'action' : action });
	}
};

process.on('message', handleMessage);
