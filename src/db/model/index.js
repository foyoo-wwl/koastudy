/*
 * @Author: your name
 * @Date: 2020-05-20 00:21:22
 * @LastEditTime: 2020-05-26 22:48:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wb/src/db/model/index.js
 */
/**
 * @description 数据模型入口文件
 */

const User = require('./User')
const Blog = require('./Blog')

Blog.belongsTo(User, {
    foreignKey: 'userId',
})

module.exports = {
    User,
    Blog,
}