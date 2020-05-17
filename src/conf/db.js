/**
 * @description 存储配置
 * @author foyoo
 */

const {
    isDev,
} = require('../utils/env')

let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1',
}

let MYSQL_CONF = {
    host: '127.0.0.1',
    user: 'root',
    password: 'zaijian4114',
    port: 3306,
    database: 'koa2_wb',
}

if (isDev) {
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1',
    }
    MYSQL_CONF = {
        host: '127.0.0.1',
        user: 'root',
        password: 'zaijian4114',
        port: 3306,
        database: 'koa2_wb',
    }
}


module.exports = {
    REDIS_CONF,
    MYSQL_CONF,
}