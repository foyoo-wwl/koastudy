/* eslint-disable consistent-return */
/**
 * @description json schema 验证
 */

const Ajv = require('ajv')

const ajv = new Ajv({
    allErrors: true,
})


/**
 * @description json schema校验
 * @param {object} schema 校验的规则
 * @param {object} data 校验数据
 */

function validate(schema, data = {}) {
    const valid = ajv.validate(schema, data)
    if (!valid) {
        return ajv.errors[0]
    }
}

module.exports = {
    validate,
}