const Koa = require('koa')
const serve = require('koa-static')
const path = require('path')
const router = require('koa-router')()
const MarkdownIt = require('markdown-it')
const fs = require('fs')
const app = new Koa()
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

module.exports = (dir) => {
  dir = dir || '.'
  // app.use('/assets', serve(path.resolve(dir, 'assets')));
  router.get('/', async (ctx, next) => {
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

    ctx.body = files
  })

  router.get('/posts/*.html', async (ctx, next) => {
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
    ctx.body = md.render(data.content)
  })

  app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000)
}

let parseData = (data) => {
  let split = '---\n'
  let i = data.indexOf(split)
  let info = {}
  if (i !== -1) {
    let j = data.indexOf(split, i + split.length)
    if (j !== -1) {
      let header = data.slice(i + split.length, j).trim()
      data = data.slice(j + split.length)
      header.split('\n').forEach((line) => {
        let i = line.indexOf(':')
        if (i !== -1) {
          let k = line.slice(0, i).trim()
          let v = line.slice(i + 1).trim()
          info[k] = v
        }
      })
    }
  }
  info.content = data
  return info
}
