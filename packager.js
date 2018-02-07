const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const log = require('npmlog')
const copy = require('copy')
const packlist = require('npm-packlist')
const pathIsInside = require("path-is-inside")

const DEFAULT_DIST = '.'

const readPackageConfig = () => require(process.cwd() + '/package.json')

const getDistDir = (pkg) => {
  const distDir = _.get(pkg, 'directories.dist', DEFAULT_DIST)
  return path.join(process.cwd(), distDir)
}

const relativePath = (file)=> {
  return path.relative(process.cwd(), file)
}

const createPackageConfig = (pkg, distDir) => {
  const packageFilePath = path.join(distDir, 'package.json')
  // Remove the pkg.files because we will copy over the files
  // that you want to include on the package
  const finalPkgConfig = _.omit(pkg, ['files'])
  const fileData = JSON.stringify(finalPkgConfig, undefined, 2)

  log.info(`creating ${relativePath(packageFilePath)}`)
  return fs.writeFileSync(packageFilePath, fileData)
}

const copyFiles = (pkg, distDir) => {
  return new Promise(async (resolve, reject) => {
    const opts = {}
    const allFiles = await packlist({ path: process.cwd() })
    const files = allFiles.filter(file => {
      const filePath = path.join(process.cwd(), file)
      // Do not copy package.json because we will create it
      if(file === 'package.json') return false
      // Do not copy anything inside the `dist` folder
      if(pathIsInside(filePath, distDir)) return false
      return true
    })

    copy.each(files, distDir, opts, (err, files) => {
      if (err) return reject(err)
      files.map((file) => log.info(`created ${relativePath(file.dest)}`))
      return resolve(files)
    })
  })
}

const createDistDir = (distDir) => {
  const fileExists = fs.existsSync(distDir)
  if (fileExists) return
  fs.mkdirSync(distDir)
}

const prepareDist = (pkg, distDir) => {
  return new Promise(async (resolve, reject) => {
    try {
      createDistDir(distDir)
      createPackageConfig(pkg, distDir)
      await copyFiles(pkg, distDir)
      resolve()
    } catch (err) {
      log.error(err.message)
      reject(err)
    }
  })
}

const preparePackage = () => {
  return new Promise(async (resolve) => {
    const pkg = readPackageConfig()
    const distDir = getDistDir(pkg)
    if (distDir !== process.cwd()) await prepareDist(pkg, distDir)
    return resolve({ distDir })
  })
}

module.exports = {
  preparePackage
}
