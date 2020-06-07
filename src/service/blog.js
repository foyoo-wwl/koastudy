/* eslint-disable no-param-reassign */
/*
 * @Author: your name
 * @Date: 2020-05-26 23:34:04
 * @LastEditTime: 2020-06-07 21:11:34
 * @LastEditors: Please set LastEditors
 * @Description: 微博service
 * @FilePath: /wb/src/service/blog.js
 */

const {
    Blog,
    User,
} = require('../db/model/index')
const {
    formatUser,
} = require('./_format')

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


/**
 * 获取个人微博数据
 * @param {object} param0 用户名 当前页数 每一页显示数量
 */
async function getBlogListByUser({
    userName,
    pageIndex = 0,
    pageSize = 5,
}) {
    // 拼接查询条件
    const userWhereOpts = {}
    if (userName) {
        userWhereOpts.userName = userName
    }
    // 执行查询
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'desc'],
        ],
        include: [{
            model: User,
            attributes: ['userName', 'nickName', 'picture'],
            where: userWhereOpts,
        }],
    })
    // result.count 总数 跟分页无关
    // result.rows  查询结果 数组


    // 获取dataValues
    let blogList = result.rows.map((row) => row.dataValues)

    blogList = blogList.map((blogItem) => {
        const user = blogItem.user.dataValues
        blogItem.user = formatUser(user)
        return blogItem
    })
    return {
        count: result.count,
        blogList,
    }
}

module.exports = {
    createBlog,
    getBlogListByUser,
}