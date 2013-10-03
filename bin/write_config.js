var 
	exec = require('child_process').exec
	, opts = { timeout : 10000 }
	, fs = require('fs')
	, path = require('path')
	, util = require('util')
	, confPath = process.argv[2]
	, writeConfig = function(conf) {

		console.log("conf path is: ");
		console.log(confPath);
		console.log("Writing WiFi configuration...");
		var fd = fs.createWriteStream(confPath);
		fd.on('error', function(err) {

			console.log("Error writing WiFi configuration.", err);
			process.send({ 'action' : 'writeConfig', error : err });
			fd.end();
			return; 
		});

		var write = [

			"ctrl_interface=/var/run/wpa_supplicant"
		];

		write.push("network={");
		write.push(util.format("\tssid=\"%s\"", conf.ssid));

		if(conf.encryption && conf.auth == "PSK") {


			write.push("\tkey_mgmt=WPA-PSK");
			write.push("\tproto=" + (conf.encType == "WPA2" ? 

				"WPA2" : "WPA"
			));
			write.push(util.format("\tpsk=\"%s\"", conf.password));
		}
		else if((conf.auth == "WEP") || (conf.encryption && !conf.auth)) {

			write.push("\tkey_mgmt=NONE");
			write.push("\twep_tx_keyidx=0");
			write.push(util.format("\twep_key0=%s", conf.password));
		}
		else {

			write.push("\tkey_mgmt=NONE");
		}

		if(conf.hidden) {

			write.push("\tscan_ssid=1");
		}
		write.push("}\n");
		fd.end(write.join("\n"));

		console.log("Finished writing WiFi configuration.");
		process.send({ 'action' : 'writeConfig', data : true });
	}
;

module.exports = writeConfig;
