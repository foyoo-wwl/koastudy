/**
 * @description user api test
 */

const server = require('../server')

// 用户信息

const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1
}

// 存储 cookie

let COOKIE = ''

// 注册
test('注册一个用户，应该成功', async () => {
    const res = await server
        .post('/api/user/register')
        .send(testUser)
    console.log(res.body)
    expect(res.body.error).toBe(0)
})

// 重复注册
test('重复注册用户，应该失败', async () => {
    const res = await server
        .post('/api/user/register')
        .send(testUser)
    console.log(res.body)
    expect(res.body.error).not.toBe(0)
})

// 查询用户名应该存在
test('查询用户名,应该存在', async () => {
    const res = await server
        .post('/api/user/isExist')
        .send({
            userName
        })
    expect(res.body.error).toBe(0)
})

// json schema 检测
test('json schema 检测，非法的格式，注册应该失败', async () => {
    const res = await server
        .post('/api/user/register')
        .send({
            userName: '1',
            password: '1',
            nickName: 2,
            gender: 1
        })
    expect(res.body.error).toBe(10009)
})

// 登陆
test('登陆 应该成功', async () => {
    const res = await server
        .post('/api/user/login')
        .send({
            userName,
            password
        })
    expect(res.body.error).toBe(0)

    // 获取cookie
    COOKIE = res.headers['set-cookie'].join(';')
})

// // 修改基本信息
test('修改基本信息应该成功', async () => {
    const res = await server
        .patch('/api/user/changeInfo')
        .send({
            nickName: '测试昵称',
            city: "测试城市"
        })
        .set('cookie', COOKIE)
    expect(res.body.error).toBe(0)
})

// 修改密码
test('修改密码应该成功', async () => {
    const res = await server
        .patch('/api/user/changePassword')
        .send({
            password,
            newPassword: `p_${Date.now()}`
        })
        .set('cookie', COOKIE)
    expect(res.body.error).toBe(0)
})

// 删除
test('删除用户 应该成功', async () => {
    const res = await server
        .post('/api/user/delete')
        .set('cookie', COOKIE)
    expect(res.body.error).toBe(0)
})

// 退出
test("退出登陆应该成功", async () => {
    const res = await server
        .post('/api/user/logout')
        .set('cookie', COOKIE)
    expect(res.body.error).toBe(0)
})

// 再次查询用户，应该不存在
test('删除之后再次查询用户名,应该存在', async () => {
    const res = await server
        .post('/api/user/isExist')
        .send({
            userName
        })
    expect(res.body.error).toBe(10003)
})