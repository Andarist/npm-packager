#!/usr/bin/env node

const program = require('commander')

program
  .version('0.0.1', '-v, --version')
  .command('pack', 'create a tarball from a package')
  .command('publish ', 'publish a package')
  .parse(process.argv)
