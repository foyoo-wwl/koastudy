/* eslint-disable prefer-const */
/* eslint-disable radix */
/*
 * @Author: your name
 * @Date: 2020-06-07 20:30:28
 * @LastEditTime: 2020-06-07 21:11:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wb/src/routes/api/blog-profile.js
 */

const router = require('koa-router')()
const {
    loginCheck,
} = require('../../middlewares/loginChecks')
const {
    getProfileBlogList,
} = require('../../controller/blog-profile')

router.prefix('/api/profile')

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx) => {
    let {
        userName,
        pageIndex,
    } = ctx.params
    pageIndex = parseInt(pageIndex)
    const result = await getProfileBlogList(userName, pageIndex, 5)
    ctx.body = result
})

module.exports = router