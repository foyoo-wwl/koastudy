/*
 * @Author: your name
 * @Date: 2020-05-27 00:07:31
 * @LastEditTime: 2020-05-27 00:10:42
 * @LastEditors: Please set LastEditors
 * @Description: 微博数据模型单元测试
 * @FilePath: /wb/test/blog/mode.test.js
 */

const {
    Blog
} = require('../../src/db/model/index')

test('微博数据模型各个属性，符合预期', () => {
    const blog = Blog.build({
        userId: 1,
        content: 'foyoo',
    })

    expect(blog.userId).toBe(1)
    expect(blog.content).toBe('foyoo')
})