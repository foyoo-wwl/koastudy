/*
 * @Author: your name
 * @Date: 2020-05-26 23:00:41
 * @LastEditTime: 2020-06-07 23:45:31
 * @LastEditors: Please set LastEditors
 * @Description: 微博 view 路由
 * @FilePath: /wb/src/routes/view/blog.js
 */

const router = require('koa-router')()
const {
    loginRedirect,
} = require('../../middlewares/loginChecks')
const {
    getProfileBlogList,
} = require('../../controller/blog-profile')
const {
    getSquareBlogList,
} = require('../../controller/blog-square')
// 首页
router.get('/', loginRedirect, async (ctx) => {
    await ctx.render('index', {})
})


// 个人主页
router.get('/profile', loginRedirect, async (ctx) => {
    const {
        userName,
    } = ctx.session.userInfo
    ctx.redirect(`profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx) => {
    const {
        userName: curUserName,
    } = ctx.params
    // 获取微博第一页数据
    // controller
    const result = await getProfileBlogList(curUserName, 0)
    const {
        isEmpty,
        blogList,
        pageIndex,
        pageSize,
        count,
    } = result.data
    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageIndex,
            pageSize,
            count,
        },
    })
})


// 微博广场
router.get('/square', loginRedirect, async (ctx) => {
    const result = await getSquareBlogList(0)
    const {
        isEmpty,
        blogList,
        pageSize,
        pageIndex,
        count,
    } = result.data

    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count,
        },
    })
})
module.exports = router