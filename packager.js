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

const createPackageConfig = (pkg, dir) => {
  const relativePath = path.relative(process.cwd(), dir)
  const packageFile = path.join(dir, 'package.json')
  const fileData = JSON.stringify(pkg, undefined, 2)
  log.info(`creating package.json on ${relativePath}`)
  return fs.writeFileSync(packageFile, fileData)
}

const preparePackage = () => {
  const pkg = readPackageConfig()
  const distDir = getDistDir(pkg)
  createPackageConfig(pkg, distDir)
  return distDir
}

module.exports = {
  preparePackage
}
