const ApiError = require('../error/ApiError')
const tokenSevice = require('../service/token-service')

module.exports = function (req, res, next) {
    try {
        const autorizationHeader = req.headers.autorization

        if (!autorizationHeader) {
            return next(ApiError.unAutorizade())
        }

        const accessToken = autorizationHeader.split(' ')[1]
        console.log(accessToken)
        if (!accessToken) {
            return next(ApiError.unAutorizade())
        }

        const userData = tokenSevice.validateAccessToken(accessToken)
        console.log(userData)
        if (!userData) {
            return next(ApiError.unAutorizade())
        }

        req.userData
        next()
    } catch (e) {
        return next(ApiError.unAutorizade())
    }
}
