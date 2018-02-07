const log = require('npmlog')
const execa = require('execa')

const Package = require('./packager')

const PackCommand = (args = {}) => {
  const distDir = Package.preparePackage()
  const cmdArgs = ['pack', distDir]
  const r = execa.sync('npm', cmdArgs).stdout
  log.info(r)
}

module.exports = PackCommand
