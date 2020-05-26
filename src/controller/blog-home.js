/* eslint-disable no-console */
/*
 * @Author: your name
 * @Date: 2020-05-26 23:32:29
 * @LastEditTime: 2020-05-26 23:52:40
 * @LastEditors: Please set LastEditors
 * @Description: 首页controller
 * @FilePath: /wb/src/controller/blog-home.js
 */

const xss = require('xss')
const createBlog = require('../service/blog')
const {
    SuccessModel,
    ErrorModel,
} = require('../model/ResModel')
const {
    createBlogFailInfo,
} = require('../model/ErrorInfo')
/**
 * 创建微博
 * @param {Object} param0 创建微博需要的数据
 */
async function create({
    userId,
    content,
}) {
    // service
    try {
        // 创建微博
        const blog = await createBlog({
            userId,
            content: xss(content),
        })
        return new SuccessModel(blog)
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}

module.exports = create