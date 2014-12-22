#!/usr/bin/env node

/**
 * On a fresh clone, the local platforms/ and plugins/ directories will be
 * missing, so ensure they get created before the first platform is added.
 */
var mkdirp = require('mkdirp');
//var rmdirp = require('rmdirp');
var path = require('path');

var platformsDir = path.resolve(__dirname, '../../platforms');
var pluginsDir = path.resolve(__dirname, '../../plugins');

mkdirp(platformsDir, function (err) {
  if (err) { console.error(err); }
});

/*
rmdirp(pluginsDir, function (err) {
  if (err) { console.error(err); }
});
*/

// delete plugins and plugins directory
var path = require('path');
// var script = path.resolve(__dirname, '../../', 'rmdir -p ' + pluginsDir );
var script = 'rm -Rf '+ pluginsDir;
var exec = require('child_process').exec;

exec(script, function (error, stdout, stderr) {
				    if (error !== null) {
				      console.log('exec error: ' + error);
				    }
				    mkdirp(pluginsDir, function (err) {
					  if (err) { console.error(err); }
					}); 
});


