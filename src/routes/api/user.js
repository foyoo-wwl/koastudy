/**
 * @description user api 路由
 */

const router = require('koa-router')()
const {
    isExist,
    register,
    login,
} = require('../../controller/user')
const userValidate = require('../../validator/user')
const {
    genValidator,
} = require('../../middlewares/validators')

router.prefix('/api/user')


// // 注册路由
router.post('/register', genValidator(userValidate), async (ctx) => {
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

// 登陆
router.post('/login', async (ctx) => {
    const {
        userName,
        password,
    } = ctx.request.body
    ctx.body = await login(
        ctx,
        userName,
        password,
    )
})

module.exports = router