/* eslint-disable no-unused-vars */
/**
 * @description res数据模型
 */

// eslint-disable-next-line max-classes-per-file
class BaseMOdel {
    constructor({
        error,
        data,
        message,
    }) {
        this.error = error
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}


/**
 * @description 成功的数据模型
 */
class SuccessModel extends BaseMOdel {
    constructor(data = {}) {
        super({
            error: 0,
            data,
        })
    }
}

/**
 * @description 失败的数据模型
 */

class ErrorModel extends BaseMOdel {
    constructor({
        error,
        message,
    }) {
        super({
            error,
            message,
        })
    }
}

module.exports = {
    SuccessModel,
    ErrorModel,
}