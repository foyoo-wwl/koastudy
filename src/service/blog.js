/*
 * @Author: your name
 * @Date: 2020-05-26 23:34:04
 * @LastEditTime: 2020-05-26 23:42:39
 * @LastEditors: Please set LastEditors
 * @Description: 微博service
 * @FilePath: /wb/src/service/blog.js
 */

const {
    Blog,
} = require('../db/model/index')

/**
 * 创建微博
 * @param {Object} param0 创建微博所需要的数据
 */
async function createBlog({
    userId,
    content,
}) {
    const result = await Blog.create({
        userId,
        content,
    })
    return result.dataValues
}

module.exports = createBlog