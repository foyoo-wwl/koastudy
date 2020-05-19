/**
 * @description  登陆验证的中间件
 */

const {
    ErrorModel,
} = require('../model/ResModel')
const {
    loginCheckFailInfo,
} = require('../model/ErrorInfo')

/**
 * api 登陆验证
 * @param {Object} ctx ctx
 * @param {function} next next
 */
async function loginCheck(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        // 已登陆
        await next()
        return
    }
    // 未登陆
    ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面登陆验证
 * @param {Object} ctx ctx
 * @param {function} next next
 */
async function loginRedirect(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        // 已登陆
        await next()
        return
    }
    // 未登陆
    const curUrl = ctx.url
    ctx.redirect(`/login?url=${encodeURIComponent(curUrl)}`)
}

module.exports = {
    loginCheck,
    loginRedirect,
}