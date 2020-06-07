/*
 * @Author: your name
 * @Date: 2020-06-07 23:10:46
 * @LastEditTime: 2020-06-07 23:44:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wb/src/controller/blog-square.js
 */

const {
    PAGE_SIZE,
} = require('../conf/constant')
const {
    SuccessModel,
} = require('../model/ResModel')

const {
    getSquareCacheList,
} = require('../cache/blog')
/**
 * 获取微博广场数据
 * @param {number} pageIndex 当前页数
 */
async function getSquareBlogList(pageIndex = 0) {
    const result = await getSquareCacheList(pageIndex, PAGE_SIZE)
    const {
        blogList,
    } = result
    // 拼接返回数据
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count,
    })
}

module.exports = {
    getSquareBlogList,
}