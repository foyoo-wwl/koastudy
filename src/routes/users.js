const router = require('koa-router')()

router.prefix('/users')

// eslint-disable-next-line no-unused-vars
router.get('/', (ctx, next) => {
    ctx.body = 'this is a users response!'
})
// eslint-disable-next-line no-unused-vars
router.get('/bar', (ctx, next) => {
    ctx.body = 'this is a users/bar response'
})
// eslint-disable-next-line no-unused-vars
router.post('/login', async (ctx, next) => {
    const {
        username,
        password,
    } = ctx.request.body
    ctx.body = {
        name: username,
        pwd: password,
    }
})

module.exports = router