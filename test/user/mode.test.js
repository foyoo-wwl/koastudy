/**
 * @description user model test
 */

const {
    User
} = require('../../src/db/model/index')

test('user 模型各个属性，符合预期', () => {
    // build 会构建一个内存的实例，但是不会提交到数据库中
    const user = User.build({
        userName: 'zhansan',
        password: 'fajjga',
        nickName: '发',
        picture: '/xxx.png',
        city: '北京'
    })
    // 验证各个属性
    expect(user.userName).toBe('zhansan')
    expect(user.password).toBe('fajjga')
    expect(user.nickName).toBe('发')
    expect(user.picture).toBe('/xxx.png')
    expect(user.city).toBe('北京')
})