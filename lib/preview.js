const Koa = require('koa')
const logger = require('koa-logger')
const serve = require('koa-static')
const path = require('path')
const router = require('koa-router')()
const MarkdownIt = require('markdown-it')
const opn = require('opn')
const react = require('koa-react-view')
const utils = require('./utils')
const config = require('../config')
const app = new Koa()
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

// start port
const port = config.port || 3000
const viewpath = path.join(__dirname, 'views')

// log
app.use(logger())

react(app, {
  views: viewpath
})

module.exports = (dir) => {
  dir = dir || ''
  // app.use('/assets', serve(path.resolve(dir, 'assets')));
  router.get('/', async (ctx, next) => {
    let _dir = path.resolve(dir, 'example/_posts')
    let files = await utils.getAllFiles(dir)
    files.forEach((v, i) => {
      v = v.split('.')
      v.pop()
      files[i] = v.join()
    })

    ctx.body = files
  })

  router.get('/posts/*.html', async (ctx, next) => {
    let name = path.parse(ctx.params[0]).name
    let file = path.resolve(dir, `${name}.md`)

    let data = await utils.getFileData(file)
    data = utils.parseData(data.toString())
    console.log(data)

    ctx.body = md.render(data.content)
  })

  app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(port)

  opn(`http://127.0.0.1:${port}`)
}
