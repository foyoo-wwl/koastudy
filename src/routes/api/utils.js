/*
 * @Author: your name
 * @Date: 2020-05-26 00:04:31
 * @LastEditTime: 2020-05-26 23:24:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wb/src/routes/api/utils.js
 */
/**
 * @description  utils api 路由
 */

const router = require('koa-router')()
const koaFrom = require('formidable-upload-koa')
const {
    loginCheck,
} = require('../../middlewares/loginChecks')
const {
    saveFile,
} = require('../../controller/utils')

router.prefix('/api/utils')

// 上传图片
router.post('/upload', loginCheck, koaFrom(), async (ctx) => {
    const {
        file,
    } = ctx.req.files.file
    if (!file) {
        return
    }
    const {
        size,
        path,
        name,
        type,
    } = file
    ctx.body = await saveFile({
        name,
        type,
        size,
        filePath: path,
    })
})

module.exports = router