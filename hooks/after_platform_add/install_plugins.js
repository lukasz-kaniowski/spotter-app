#!/usr/bin/env node

/**
 * Install all plugins listed in package.json
 */

var fs = require('fs');
var path = require('path');
var sys = require('sys')
var exec = require('child_process').exec;

var packageJson = require('../../package.json');
var cmd = process.platform === 'win32' ? 'cordova.cmd' : 'cordova';
var script = path.resolve(__dirname, '../../node_modules/cordova/bin', cmd);

function createAddRemoveStatement(plugin) {
    var pluginCmd = script + ' plugin ' + command + ' ';
    if(typeof plugin === 'string') {
        pluginCmd += plugin;
    } else {
        if((command === 'add') || (command === 'rm') ){
            pluginCmd += plugin.locator + ' ';
            if(plugin.variables) {
                Object.keys(plugin.variables).forEach(function(variable){
                    pluginCmd += '--variable ' + variable + '="' + plugin.variables[variable] + '" ';
                });
            }
        } else {
        	
            pluginCmd += plugin.id;
        }
    }

    return pluginCmd;
}

function processPlugin(index) {
    if(index >= packageJson.cordovaPlugins.length)
        return;

    var plugin = packageJson.cordovaPlugins[index];
    var pluginCommand = createAddRemoveStatement(plugin);
    console.log(pluginCommand);
    exec(pluginCommand, function (error, stdout, stderr) {
		    // console.log('stdout: ' + stdout);
		    if (error !== null) {
		      console.log('exec error: ' + error);
		    } 
	    	var k = index + 1;
	    	if (k >= packageJson.cordovaPlugins.length) {
	    		if (command == 'rm') {
	    			// console.log("Finished removing plugins")
	    			command = 'add';
	    			processPlugin(0);
	    		} else if (command == 'add') {
	    			// console.log("Finished adding plugins")
	    			return;
	    		}
	    	} else {
		        processPlugin(index + 1);	    		
	    	}
    });
}


var command = 'rm';
processPlugin(0);