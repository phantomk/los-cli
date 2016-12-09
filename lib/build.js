const path = require('path')
const render = require('./render')
const fse = require('fs-extra')

module.exports = (dir, options) => {
  dir = dir || ''
  let outputDir = path.resolve(options.output || dir)

  let htmlIndex, fileIndex
  console.log(`building: ${fileIndex.slice(outputDir.length + 1)}`)
  fse.outputFile(fileIndex, htmlIndex)
}
