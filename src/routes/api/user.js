/**
 * @description user api 路由
 */

const router = require('koa-router')()
const {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    loginOut,
} = require('../../controller/user')
const userValidate = require('../../validator/user')
const {
    genValidator,
} = require('../../middlewares/validators')

const {
    isTest,
} = require('../../utils/env')

const {
    loginCheck,
} = require('../../middlewares/loginChecks')

router.prefix('/api/user')


// 注册路由
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

// 删除
router.post('/delete', loginCheck, async (ctx) => {
    if (isTest) {
        const {
            userName,
        } = ctx.session.userInfo
        // 调用controller
        ctx.body = await deleteCurUser(userName)
    }
})

// 修改个人信息
router.patch('/changeInfo', genValidator(userValidate), async (ctx) => {
    const {
        nickName,
        city,
        picture,
    } = ctx.request.body
    const result = await changeInfo(ctx, {
        nickName,
        city,
        picture,
    })
    // controller
    ctx.body = result
})


// 修改密码
router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx) => {
    const {
        password,
        newPassword,
    } = ctx.request.body
    const {
        userName,
    } = ctx.session.userInfo
    // controller
    ctx.body = await changePassword(userName, password, newPassword)
})

// 退出登陆
router.post('/logout', loginCheck, async (ctx) => {
    // controller
    ctx.body = await loginOut(ctx)
})

module.exports = router