/**
 * @description 链接redis方法
 */

const redis = require('redis')
const {
    REDIS_CONF
} = require('./../conf/db')

//创建客户端

const redisClient = redis.createClient(
    REDIS_CONF.port, REDIS_CONF.host
)

redisClient.on('error', err => {
    console.log('redis error', err)
})


/**
 * 
 * @param {string} key key
 * @param {value} val value
 * @param {number} timeout 过期单位
 */
function set(key, val, timeout = 60 * 60) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val)
    redisClient.expire(key, timeout)
}


/**
 * 
 * @param {string} key 
 */
function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val === null) {
                resolve(null)
                return
            }
            try {
                resolve(
                    JSON.parse(val)
                )
            } catch (ex) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    set,
    get
}