/* eslint-disable no-param-reassign */
/**
 * @description 数据格式化
 */

const {
    DEFAULT_PIC,
} = require('../conf/constant')

/**
 * @description 格式化用户啊照片
 * @param {obj} obj 用户信息
 */
// eslint-disable-next-line no-underscore-dangle
function _formatUserPicture(obj) {
    if (obj.picture === null) {
        obj.picture = DEFAULT_PIC
    }
    return obj
}


/**
 * @description 格式化用户信息
 * @param {array|Object} list 用户列表或者单个用户信息
 */

function formatUser(list) {
    if (list === null) {
        return list
    }
    if (list instanceof Array) {
        return list.map(_formatUserPicture)
    }
    return _formatUserPicture(list)
}

module.exports = {
    formatUser,

}