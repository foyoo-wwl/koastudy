/**
 * @description user controller
 */

const {
    getUserInfo,
    createUser,
} = require('../service/user')
const {
    SuccessModel,
    ErrorModel,
} = require('../model/ResModel')
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
} = require('../model/ErrorInfo')

const {
    doCrypto,
} = require('../utils/cyrp')


/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */

async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // 已存在
        return new SuccessModel(userInfo)
    }
    // 不存在
    return new ErrorModel(registerUserNameNotExistInfo)
}

/**
 * 用户注册
 * @param {string} userName 用户名
 * @param {string}  password 密码
 * @param {number} gender 性别 {1 男 2女}
 */
async function register({
    userName,
    password,
    gender,
}) {
    const uerInfo = await getUserInfo(userName)
    if (uerInfo) {
        return new ErrorModel(registerUserNameExistInfo)
    }
    // 实现注册功能 service
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender,
        })
        return new SuccessModel()
    } catch (error) {
        console(error)
        return new ErrorModel(registerFailInfo)
    }
}
/**
 * @description 登陆
 * @param {object} ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
    // 登陆成功 ctx.session.userInfo = xxx

    // 获取用户信息
    const userInfo = await getUserInfo(userName, doCrypto(password))
    if (!userInfo) {
        return new ErrorModel(loginFailInfo)
    }
    // 登陆成功

    if (ctx.session.userInfo == null) {
        console.log(userInfo)
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}
module.exports = {
    isExist,
    register,
    login,
}