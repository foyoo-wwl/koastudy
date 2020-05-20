/**
 * @description utils controller
 */
const path = require('path')
const fse = require('fs-extra')
const {
    ErrorModel,
    SuccessModel,
} = require('../model/ResModel')
const {
    uploadFileSizeFailInfo,
} = require('../model/ErrorInfo')

// 存储目录
const DIR_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadfiles')
// 文件最大体积 1M
const MIX_SIZE = 1024 * 1024 * 1024

// 是否需要创建目录
fse.pathExists(DIR_FOLDER_PATH).then((exist) => {
    if (!exist) {
        fse.ensureDir(DIR_FOLDER_PATH)
    }
})

/**
 * 保存文件
 * @param {string} name 文件名
 * @param {string}  type 文件类型
 * @param {number} size 文件大小
 * @param {string} filePath 文件路径
 */
async function saveFile({
    name,
    // type,
    size,
    filePath,
}) {
    if (size > MIX_SIZE) {
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }

    // 移动文件
    const fileName = `${Date.now()}.${name}` // 防止重名
    const distFilePath = path.join(DIR_FOLDER_PATH, fileName) // 目的地
    await fse.move(filePath, distFilePath)

    // 返回信息
    return new SuccessModel({
        url: `/${fileName}`,
    })
}

module.exports = {
    saveFile,
}