/*
 * @Author: your name
 * @Date: 2020-05-26 22:42:25
 * @LastEditTime: 2020-05-26 23:45:43
 * @LastEditors: Please set LastEditors
 * @Description: 微博数据模型
 * @FilePath: /wb/src/db/model/Blog.js
 */

const seq = require('../seq')

const {
    STRING,
    INTEGER,
    TEXT,
} = require('../types')

const Blog = seq.define('blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 Id',
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: '微博内容',
    },
    image: {
        type: STRING,
        comment: '图片地址',
    },
})

module.exports = Blog