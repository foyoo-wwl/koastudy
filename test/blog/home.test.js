/*
 * @Author: your name
 * @Date: 2020-05-27 00:11:42
 * @LastEditTime: 2020-05-27 00:25:47
 * @LastEditors: Please set LastEditors
 * @Description: 首页test
 * @FilePath: /wb/test/blog/home.test.js
 */
const server = require('../server')

let BLOG_ID = ''

const {
    COOKIE
} = require('../testUserInfo')
test('创建一条微博应该成功', async () => {
    // 定义测试内容
    const content = '单元测试自动创建的微博' + Date.now()

    // 开始测试
    const res = await server
        .post('/api/blog/create')
        .send({
            content,
        })
        .set('cookie', COOKIE)

    expect(res.body.error).toBe(0)
    BLOG_ID = res.body.body.userId
})