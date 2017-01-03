const path = require('path')
const fse = require('fs-extra')
const MarkdownIt = require('markdown-it')
const utils = require('./utils')

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

module.exports = async (dir, options) => {
  dir = dir || ''
  let outputDir = path.resolve(options.output || dir)
  let files = await utils.getAllFiles('./example/_posts')

  files.forEach(async (v, i) => {
    let _dir = path.resolve(dir, 'example/_posts', v)
    let data = await utils.getFileData(_dir)
    data = utils.parseData(data.toString())
    data = md.render(data.content)

    v = v.split('.')
    v.pop()
    v.push('.html')
    v = v.join('')
    console.log(`building: ${v}`)
    utils.writeFile(`./src/_post/${v}`, data)
  })
}
