'use strict';

require('./common');

var program = require('commander');

var pack = require('./package.json');
var rfg = require('rfg-api').init();
var fs = require('fs');
var async = require('async');
var path = require('path');

var args = program
  .version(pack.version)
  .command('inject <faviconFile> <outputDir> <htmlFiles...>')
  .parse(process.argv).args;

var outputDir = args[1];
var htmlFiles = args.slice(2);

fs.readFile(args[0], function(err, data) {
  if (err) {
    throw err;
  }

  var markups = JSON.parse(data).favicon.html_code;
  async.each(htmlFiles, function(htmlFile, done) {
    fs.readFile(htmlFile, function(err, content) {
      if (err) {
        throw err;
      }

      rfg.injectFaviconMarkups(content, markups, undefined, function(err, html) {
        if (err) {
          throw err;
        }

        fs.writeFile(path.join(outputDir, path.basename(htmlFile)), html, function(err) {
          if (err) {
            throw err;
          }

          done();
        });
      });
    });
  }, function(err) {
    console.log('Injection completed, ' + htmlFiles.length + ' files were processed');
  });


});
