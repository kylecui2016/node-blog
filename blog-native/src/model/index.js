class BaseModel {
    constructor(data, message) {
        if(typeof data === 'string') {
            this.message = data
            this.data = null
            return
        }
        this.data = data
        this.message = message
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message = 'success') {
        super(data, message)
        this.errno = 0
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message = 'error') {
        super(data, message)
        this.errno = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}