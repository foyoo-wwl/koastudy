/* eslint-disable no-plusplus */
const router = require('koa-router')()
const {
    loginRedirect,
    // loginCheck,
} = require('../middlewares/loginChecks')

router.get('/', loginRedirect, async (ctx) => {
    ctx.body = 'Hello Koa 2!'
})

router.get('/string', async (ctx) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async (ctx) => {
    const {
        session,
    } = ctx

    if (session.viewNum == null) {
        session.viewNum = 0
    }


    session.viewNum++
    ctx.body = {
        title: 'koa2 json',
    }
})

router.get('/profile/:username', async (ctx) => {
    const {
        username,
    } = ctx.params
    ctx.body = {
        tittle: 'this is',
        name: username,
    }
})

router.get('/profile/:username/:pageIndex', async (ctx) => {
    const {
        username,
        pageIndex,
    } = ctx.params
    ctx.body = {
        tittle: 'this is',
        name: username,
        page: pageIndex,
    }
})

module.exports = router