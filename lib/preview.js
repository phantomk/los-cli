const koa = require('koa')
const serve = require('koa-static')
const path = require('path')
const router = require('koa-router')()
const markdownIt = require('markdown-it')
const fs = require('fs')
const app = new koa()
const md = new markdownIt({
  html: true,
  linkify: true,
  typographer: true
})

module.exports = (dir) => {
  dir = dir || '.'
  // app.use('/assets', serve(path.resolve(dir, 'assets')));
  router.get('/', (ctx, next) => {
    ctx.body = '文章列表'
  })

  router.get('/posts/*.html', async(ctx, next) => {
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
    ctx.body = md.render(data.toString())
  })

  app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000)
}
