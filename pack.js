const log = require('npmlog')
const execa = require('execa')

const Package = require('./packager')

const PackCommand = (args = {}) => {
  const { distDir } = Package.preparePackage()
  const cmdArgs = ['pack', distDir]

  try {
    const message = execa.sync('npm', cmdArgs).stdout
    log.info(`creating ${message}`)
  } catch (e) {
    log.error(e.message)
  }
}

module.exports = PackCommand
