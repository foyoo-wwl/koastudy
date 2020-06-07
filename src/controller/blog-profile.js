/*
 * @Author: your name
 * @Date: 2020-06-07 15:38:07
 * @LastEditTime: 2020-06-07 16:02:15
 * @LastEditors: Please set LastEditors
 * @Description: 个人主页
 * @FilePath: /wb/src/controller/blog-profile.js
 */

const {
    getBlogListByUser,
} = require('../service/blog')
const {
    PAGE_SIZE,
} = require('../conf/constant')
const {
    SuccessModel,
} = require('../model/ResModel')
/**
 * 获取个人主页微博列表
 * @param {string} userName 用户名
 * @param {number} pageIndex 当前页数
 */
async function getProfileBlogList(userName, pageIndex = 0) {
    // services
    const result = await getBlogListByUser({
        userName,
        pageIndex,
        pageSize: PAGE_SIZE,
    })
    const {
        blogList,
    } = result

    // 拼接返回数据
    return new SuccessModel({
        isEmpty: blogList.lenght === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count,
    })
}

module.exports = {
    getProfileBlogList,
}