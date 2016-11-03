#!/usr/bin/env node

'use strict'

require('./compiled-check.js')('chrome-launcher.js');

const args = process.argv.slice(2);

let chromeArgs;
let startingUrl;

if (args.length) {
  // If the first argument starts with -- assume all are chrome args.
  if (args[0].startsWith('--')) {
    chromeArgs = args;
  } else {
    startingUrl = args[0];
    chromeArgs = args.slice(1);
  }
}

const chromeLauncher = require('./chrome-launcher.js').ChromeLauncher;
const chromeInstance = new chromeLauncher({
  url: startingUrl,
  additionalFlags: chromeArgs,
});

chromeInstance.prepare();
chromeInstance.run();

