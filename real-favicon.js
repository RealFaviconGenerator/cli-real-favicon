#! /usr/bin/env node

'use strict';

var program = require('commander');

var pack = require('./package.json');

program
  .version(pack.version)
  .description(
    'A command-line interface for RealFaviconGenerator. ' +
    'Instead of reading some boring documentation, visit ' +
    'https://realfavicongenerator.net/ to generate exactly what you need.')
  .command('generate <faviconRequest> <faviconFile> <outputDir>',
    'Generate favicon images and HTML markups')
  .command('inject <faviconFile> <outputDir> <htmlFiles>',
    'Inject favicon HTML markups into pages')
  .command('check-for-update <faviconFile>',
    'Check for updates on RealFaviconGenerator')
  .parse(process.argv);
