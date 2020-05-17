/**
 * @description user api 路由
 */

const router = require('koa-router')()
const {
    isExist,
} = require('../../controller/user')

router.prefix('/api/user')

// // 注册路由
// router.post('/register', (ctx, next) => {

// })

// 查询用户名已存在
router.post('/isExist', async (ctx) => {
    const {
        userName,
    } = ctx.request.body
    // controller
    const body = await isExist(userName)
    ctx.body = body
})


module.exports = router