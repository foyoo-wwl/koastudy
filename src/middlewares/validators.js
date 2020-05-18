/**
 * @description json schema 验证中间件
 */

const {
    ErrorModel,
} = require('../model/ResModel')
const {
    jsonSchemaFileInfo,
} = require('../model/ErrorInfo')

/**
 * @description 生成 json achema 验证的中间件
 * @param {function} validateFn 验证函数
 */
function genValidator(validateFn) {
    // 定义中间件函数
    async function validator(ctx, next) {
        // 校验
        const error = validateFn(ctx.request.body)
        if (error) {
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            return
        }
        await next()
    }
    // 返回中间件函数
    return validator
}

module.exports = {
    genValidator,
}