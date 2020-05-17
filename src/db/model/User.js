/**
 * @description 用户数据模型
 */

const seq = require('../seq')
const {
    STRING,
    DECIMAL,
} = require('../types')
// users
const User = seq.define('user', {
    userName: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: '用户名唯一',
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: '密码',
    },
    nickName: {
        type: STRING,
        allowNull: false,
        comment: '昵称',
    },
    gender: {
        type: DECIMAL,
        allowNull: false,
        default: 3,
    },
    picture: {
        type: STRING,
        comment: '头像图片地址',
    },
    city: {
        type: STRING,
    },
})

module.exports = User