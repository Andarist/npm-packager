const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const log = require('npmlog')

const DEFAULT_DIST = '.'

const readPackageConfig = () => {
  return require(process.cwd() + '/package.json')
}

const getDistDir = (pkg) => {
  const distDir = _.get(pkg, 'directories.dist', DEFAULT_DIST)
  return path.join(process.cwd(), distDir)
}

const createPackageConfig = (pkg, packageFile) => {
  const relativePath = path.relative(process.cwd(), packageFile)
  const fileData = JSON.stringify(pkg, undefined, 2)

  log.info(`creating ${relativePath}`)
  return fs.writeFileSync(packageFile, fileData)
}

const preparePackage = () => {
  const pkg = readPackageConfig()
  const distDir = getDistDir(pkg)
  const packageFile = path.join(distDir, 'package.json')

  if(!fs.existsSync(packageFile)) createPackageConfig(pkg, packageFile)

  return {
    distDir
  }
}

module.exports = {
  preparePackage
}
