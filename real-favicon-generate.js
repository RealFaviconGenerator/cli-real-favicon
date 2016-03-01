'use strict';

require('./common');

var program = require('commander');

var pack = require('./package.json');
var rfg = require('rfg-api').init();
var fs = require('fs');

var args = program
  .version(pack.version)
  .command('generate <faviconRequest> <faviconFile> <outputDir>')
  .parse(process.argv).args;

fs.readFile(args[0], function(err, data) {
  if (err) {
    throw err;
  }

  var favicon = JSON.parse(data);

  var opts = {
    apiKey: API_KEY,
    masterPicture: favicon.masterPicture,
    iconsPath: favicon.iconsPath,
    design: favicon.design,
    settings: favicon.settings,
    versioning: favicon.versioning
  };

  var request = rfg.createRequest(opts);

  rfg.generateFavicon(request, args[2], function(err, result) {
    if (err) {
      throw err;
    }

    fs.writeFile(args[1], JSON.stringify(result), function(err) {
      if (err) {
        throw err;
      }

      console.log("Generation completed");
    });
  });
});
