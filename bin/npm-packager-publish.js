#!/usr/bin/env node

const program = require('commander')
const CLI = require('../cli')

program
  .version('0.0.1', '-v, --version')
  .description('create a tarball from a package.')
  .option('--tag <tag>')
  .option('--access <public|restricted>')
  .parse(process.argv)

CLI('publish', {
  tag: program.tag,
  access: program.access
})
