const PublishCommand = require('./publish')
const PackCommand = require('./pack')

const CLI = (cmd, args) => {
  switch (cmd) {
    case 'pack': return PackCommand(args)
    case 'publish': return PublishCommand(args)
    default: throw new Error(`${cmd} not found`)
  }
}

module.exports = CLI
