class CustomError extends Error {
    constructor(message, code, info) {
        super(message)
        this.code = code
        this.info = info
        Error.captureStackTrace(this, CustomError)
    }
}

exports.CustomError = CustomError