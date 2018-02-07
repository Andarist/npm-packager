const log = require('npmlog')
const execa = require('execa')

const Package = require('./packager')

const PublishCommand = async (args = {}) => {
  const {
    tag,
    access
  } = args

  const { distDir } = await Package.preparePackage()
  const cmdArgs = ['publish', distDir]

  if (tag) cmdArgs.concat(['--tag', tag])
  if (access) cmdArgs.concat(['--access', access])

  try {
    const message = execa.sync('npm', cmdArgs).stdout
    const cleanMessage = message.replace('+ ', '')
    log.info(`published ${cleanMessage}`)
  } catch (e) {
    log.error(e.message)
  }
}

module.exports = PublishCommand
