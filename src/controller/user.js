/**
 * @description user controller
 */

const {
    getUserInfo,
} = require('../service/user')
const {
    SuccessModel,
    ErrorModel,
} = require('../model/ResModel')
const {
    resigserUserNameNotExistInfo,
} = require('../model/ErrorInfo')
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
    return new ErrorModel(resigserUserNameNotExistInfo)
}

module.exports = {
    isExist,

}