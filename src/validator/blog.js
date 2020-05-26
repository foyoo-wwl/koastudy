/*
 * @Author: your name
 * @Date: 2020-05-26 23:54:45
 * @LastEditTime: 2020-05-26 23:57:06
 * @LastEditors: Please set LastEditors
 * @Description: 微博数据格式校验
 * @FilePath: /wb/src/validator/blog.js
 */

const {
    validate,
} = require('./_validate')

// 校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string',
        },
        image: {
            type: 'string',
            maxLength: 255,
        },
    },
}

/**
 * @description 校验微博数据格式
 * @param {object} data用户数据
 */

function blogValidate(data = {}) {
    return validate(SCHEMA, data)
}

module.exports = blogValidate