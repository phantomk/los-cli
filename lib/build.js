const path = require('path')
const fse = require('fs-extra')
const MarkdownIt = require('markdown-it')
const render = require('./render')
const utils = require('./utils')

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

module.exports = async (dir, options) => {
  dir = dir || ''
  let htmlIndex, fileIndex
  let outputDir = path.resolve(options.output || dir)
  let files = await utils.getAllFiles('./example/_posts')

  files.forEach((v, i) => {
    let data = await new Promise((resolve, reject) => {
      fs.readFile((v, (err, data)) => {
        if(err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
    data = utils.parseData(data.toString())
    htmlIndex = md.render(data.content)
  })

  console.log(`building: ${fileIndex.slice(outputDir.length + 1)}`)
  fse.outputFile(fileIndex, htmlIndex)
}
