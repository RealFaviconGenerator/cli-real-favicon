'use strict';

require('./common');

var program = require('commander');

var pack = require('./package.json');
var rfg = require('rfg-api').init();
var fs = require('fs');

var args = program
  .version(pack.version)
  .option('-f, --fail-on-update', 'Purposefully fail when an update is available')
  .arguments('<faviconFile>')
  .parse(process.argv).args;

var faviconFile = args[0];

fs.readFile(faviconFile, function(err, faviconRaw) {
  var favicon = JSON.parse(faviconRaw);
  var version = favicon.version;

  rfg.changeLog(version, function(err, data) {
    if (err) {
      throw err;
    }

    if (data.length > 0) {
      var url = "https://realfavicongenerator.net/change_log?since=" + version;
      console.log("An update is available. Visit " + url + " to learn more");

      if (program.failOnUpdate) {
        process.exit(1);
      }
    }
    else {
      console.log("Your favicon is up-to-date");
    }
  });
});
