var 
	exec = require('child_process').exec
	, opts = { timeout : 10000 }
	, fs = require('fs')
	, path = require('path')
	, util = require('util')
	, writeConfig = function(conf) {

		var fd = fs.createWriteStream('/etc/wpa_supplicant.conf');

		fd.write("ctrl_interface=/var/run/wpa_supplicant\n");
		fd.write("network={\n");
		fd.write(util.format("\tssid=\"%s\"\n", conf.ssid));
		fd.write(util.format("\tpsk=%s\n", conf.password));
		fd.end("}\n");

		process.send({ action : 'writeConfig', data : true });
	}
;

module.exports = writeConfig;
