/**
 * @description 存储配置
 * @author foyoo
 */

const {
    isDev
} = require('./../utils/env')

let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

if (isDev) {
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}


module.exports = {
    REDIS_CONF
}