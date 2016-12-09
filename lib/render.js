const path = require('path')
const MarkdownIt = require('markdown-it')
const fs = require('fs')
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})
const parseData = require('./utils').parseData

module.exports = {
  renderIndex: async (dir) => {
    dir = dir || '.'
    let file = path.resolve(dir, '_posts')
    let files = await new Promise((resolve, reject) => {
      fs.readdir(file, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })

    files.forEach((v, i) => {
      v = v.split('.')
      v.pop()
      files[i] = v.join()
    })
    return files
  },

  renderPost: async (dir, ctx) => {
    dir = dir || '.'
    let name = path.parse(ctx.params[0]).name
    let file = path.resolve(dir, '_posts', `${name}.md`)

    let data = await new Promise((resolve, reject) => {
      fs.readFile(file, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })

    data = parseData(data.toString())
    console.log(data)
    return md.render(data.content)
  }
}
