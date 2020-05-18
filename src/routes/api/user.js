/**
 * @description user api 路由
 */

const router = require('koa-router')()
const {
    isExist,
    register,
} = require('../../controller/user')

router.prefix('/api/user')

// // 注册路由
router.post('/register', async (ctx) => {
    const {
        userName,
        password,
        gender,
    } = ctx.request.body
    // 调用controller
    ctx.body = await register({
        userName,
        password,
        gender,
    })
})

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