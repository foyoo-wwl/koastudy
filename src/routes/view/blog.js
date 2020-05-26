/*
 * @Author: your name
 * @Date: 2020-05-26 23:00:41
 * @LastEditTime: 2020-05-26 23:24:54
 * @LastEditors: Please set LastEditors
 * @Description: 微博 view 路由
 * @FilePath: /wb/src/routes/view/blog.js
 */

const router = require('koa-router')()
const {
    loginRedirect,
} = require('../../middlewares/loginChecks')

// 首页
router.get('/', loginRedirect, async (ctx) => {
    await ctx.render('index', {})
})

module.exports = router