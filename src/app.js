/*
 * @Author: your name
 * @Date: 2020-05-26 00:04:31
 * @LastEditTime: 2020-06-07 23:16:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wb/src/app.js
 */
/* eslint-disable no-const-assign */
/* eslint-disable spaced-comment */
/* eslint-disable no-console */
const Koa = require('koa')
const path = require('path')

const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')
const {
    isProd,
} = require('./utils/env')

const {
    REDIS_CONF,
} = require('./conf/db')

const {
    SESSION_SECRET_EKY,
} = require('./conf/secrectKeys')

const squareApiRouter = require('./routes/api/blog-square')
const profileApiRoter = require('./routes/api/blog-profile')
const blogViewRouter = require('./routes/view/blog')
const userViewRouter = require('./routes/view/user')
const errorViewRouter = require('./routes/view/error')
const userApiRouter = require('./routes/api/user')
const utilsApiRouter = require('./routes/api/utils')
const blogHomeApiRouter = require('./routes/api/blog-home')
// error handler
let onerrorConf = {}
if (isProd) {
    onerrorConf = {
        redirect: '/error',
    }
}

onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text'],
}))
app.use(json())
app.use(logger())
app.use(koaStatic(`${__dirname}/public`))

app.use(koaStatic(path.join(__dirname, '..', 'uploadfiles')))

app.use(views(`${__dirname}/views`, {
    extension: 'ejs',
}))

// session配置
app.keys = [SESSION_SECRET_EKY]
app.use(session({
    key: 'wb.sid', // cookie name
    prefix: 'wb:sess:', // redis key 前缀
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    },
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
    }),
}))


// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes

app.use(squareApiRouter.routes(), squareApiRouter.allowedMethods())
app.use(profileApiRoter.routes(), profileApiRoter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())
app.use(blogHomeApiRouter.routes(), blogHomeApiRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app