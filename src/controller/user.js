/* eslint-disable no-param-reassign */
/**
 * @description user controller
 */

const {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser,
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
    deleteUserFailInfo,
    changeInfoFailInfo,
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
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}

/**
 * 删除用户
 * @param {string} userName username
 */

async function deleteCurUser(userName) {
    const result = await deleteUser(userName)
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteUserFailInfo)
}


/**
 * 修改个人信息
 * @param {Object} ctx ctx
 * @param {nickName} string 昵称
 * @param {city} string 城市
 * @param {picture} string 头像
 */
async function changeInfo(ctx, {
    nickName,
    city,
    picture,
}) {
    const {
        userName,
    } = ctx.session.userInfo
    if (!nickName) {
        nickName = userName
    }
    const result = await updateUser({
        newNickName: nickName,
        newCity: city,
        newPicture: picture,
    }, {
        userName,
    })
    if (result) {
        Object.assign(ctx.session.userInfo, {
            nickName,
            city,
            picture,
        })
        return new SuccessModel()
    }
    return new ErrorModel(changeInfoFailInfo)
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
}