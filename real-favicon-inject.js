'use strict';

require('./common');

var program = require('commander');

var pack = require('./package.json');
var rfg = require('rfg-api').init();
var path = require('path');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var glob = require('glob');

var args = program
  .version(pack.version)
  .command('inject <faviconFile> <outputDir> <htmlFiles...>')
  .parse(process.argv).args;

var outputDir = args[1];
var htmlFiles = args.slice(2);

var markups = fs.readFileAsync(args[0]).then(function(data){
  return(JSON.parse(data).favicon.html_code);
});

Promise.resolve(htmlFiles).map(function(pattern){
  return(Promise.fromCallback(function (callback) {
    glob(pattern, callback);
  }));
}).then(function(fileArrays){
  // Flatten array
  return([].concat.apply([], fileArrays));
}).map(function(htmlFile) {
  return Promise.join(fs.readFileAsync(htmlFile), markups, function(content, markups) {
    return(Promise.fromCallback(function (callback) {
      rfg.injectFaviconMarkups(content, markups, null, callback);
    }));
  }).then(function (content) {
    return (fs.writeFileAsync(path.join(outputDir, path.basename(htmlFile)), content));
  });
}).then(function(){
  console.log('Injection completed, ' + htmlFiles.length + ' files were processed');
}).catch(function(err){
  console.error(err);
});
