const jwt = require('jsonwebtoken')
const models = require('../models/models')

class tokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '15m',
        })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '30d',
        })
        return {
            accessToken,
            refreshToken,
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await models.TokenSchema.findOne({
            where: { userId: userId },
        })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await models.TokenSchema.create({ refreshToken, userId })
        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await models.TokenSchema.destroy({
            where: { refreshToken },
        })
        return tokenData
    }

    async findToken(refreshToken) {
        console.log(refreshToken)
        const tokenData = await models.TokenSchema.findOne({
            where: { refreshToken },
        })
        console.log(tokenData)
        return tokenData
    }
}

module.exports = new tokenService()
