/* eslint-disable no-console */
/**
 * @description sequeslize同步数据库
 */

const seq = require('./seq')

require('./model/index')

seq.authenticate().then(() => {
    console.log('right')
}).catch(() => {
    console.log('err')
})

seq.sync({
    force: true,
}).then(() => {
    console.log('sync ok')
    process.exit()
})