/* eslint-disable radix */
/*
 * @Author: your name
 * @Date: 2020-06-07 23:11:55
 * @LastEditTime: 2020-06-07 23:34:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wb/src/routes/api/blog-square.js
 */

const router = require('koa-router')()
const {
    loginCheck,
} = require('../../middlewares/loginChecks')
const {
    getSquareBlogList,
} = require('../../controller/blog-square')

router.prefix('/api/square')

// 记载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx) => {
    let {
        pageIndex,
    } = ctx.params

    pageIndex = parseInt(pageIndex)
    const result = await getSquareBlogList(pageIndex)
    ctx.body = result
})

module.exports = router