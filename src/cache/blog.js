/*
 * @Author: your name
 * @Date: 2020-05-10 23:30:47
 * @LastEditTime: 2020-06-07 23:29:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wb/src/cache/blog.js
 */
/* eslint-disable no-console */
const {
    get,
    set,
} = require('./_redis')

const {
    getBlogListByUser,
} = require('../service/blog')
// redis key 前缀
const KEY_PRIFIX = 'weibo:square'

/**
 * 获取广场列表的缓存
 * @param {number} pageIndex pageIndex
 * @param {number} pageSize pageSize
 */
async function getSquareCacheList(pageIndex, pageSize) {
    const key = `${KEY_PRIFIX}${pageIndex}${pageSize}`

    // 尝试获取缓存
    const cacheResult = await get(key)
    if (cacheResult != null) {
        // 获取缓存成功
        return cacheResult
    }
    // 没有缓存，则读取数据库
    const result = await getBlogListByUser({
        pageIndex,
        pageSize,
    })

    // 设置缓存
    set(key, result, 60)

    return result
}

module.exports = {
    getSquareCacheList,
}