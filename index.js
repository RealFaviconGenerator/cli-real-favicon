#! /usr/bin/env node

'use strict';

var program = require('commander');

var pack = require('./package.json');

program
  .version(pack.version)
  .command('generate <faviconRequest> <faviconFile> <outputDir>',
    'Generate favicon images and HTML markups')
  .command('inject <faviconFile> <outputDir> <htmlFiles>',
    'Inject favicon HTML markups into pages')
  .command('check-for-update <faviconFile>',
    'Check for updates on RealFaviconGenerator')
  .parse(process.argv);
