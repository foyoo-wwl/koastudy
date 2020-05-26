/*
 * @Author: your name
 * @Date: 2020-05-26 23:26:22
 * @LastEditTime: 2020-05-26 23:42:18
 * @LastEditors: Please set LastEditors
 * @Description: 博客首页api路由
 * @FilePath: /wb/src/routes/api/blog-home.js
 */

const router = require('koa-router')()
const {
    loginCheck,
} = require('../../middlewares/loginChecks')
const create = require('../../controller/blog-home')

router.prefix('/api/blog')

router.post('/create', loginCheck, async (ctx) => {
    const {
        content,
    } = ctx.request.body
    const {
        id: userId,
    } = ctx.session.userInfo

    // controller
    ctx.body = await create({
        userId,
        content,
    })
})


module.exports = router