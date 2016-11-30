const koa = require('koa');
const serve =require('koa-static');
const path = require('path');
const router = require('koa-router')();
const app = new koa();

module.exports = (dir) => {
	dir = dir || '.';
	app.use('/assets', serve(path.resolve(dir, 'assets')));
	router.get('/', (ctx, next) => {
		ctx.body = '文章列表';
	});

	router.get('/posts', (ctx, next) => {
		ctx.body = '渲染文章';
	});

	app
		.use(router.routes())
		.use(router.allowedMethods())
		.listen(3000);
};