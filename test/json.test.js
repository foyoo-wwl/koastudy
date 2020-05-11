/**
 * json test
 */

const server = require('./server')

test('json 返回', async () => {
    const res = await server.get('/json')
    expect(res.body).toEqual({
        title: 'koa2 json'
    })
})