const ApiError = require('../error/ApiError')
const userService = require('../service/user-service')
const { validationResult } = require('express-validator')

class userController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(
                    ApiError.badrequest(
                        'Неправильный формат почты или пароля',
                        errors.array()
                    )
                )
            }
            const { name, email, password, flag } = req.body
            const userData = await userService.registration(
                name,
                email,
                password,
                flag
            )

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            res.json(200)
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const users = await userService.getAllUsers()
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params

            const user = await userService.getOneUser(id)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async checkName(req, res, next) {
        try {
            const { name } = req.body
            const check = await userService.checkNameUser(name)
            return res.json(check)
        } catch (e) {
            next(e)
        }
    }

    async checkEmail(req, res, next) {
        try {
            const { email } = req.body
            const check = await userService.checkEmailUser(email)
            return res.json(check)
        } catch (e) {
            next(e)
        }
    }

    async reset(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(
                    ApiError.badrequest(
                        'Неправильный формат пароля',
                        errors.array()
                    )
                )
            }
            const resetLink = req.params.link
            const { password } = req.body
            await userService.reset(resetLink, password)
            return res.json({ status: 200 })
        } catch (e) {
            next(e)
        }
    }

    async resetMail(req, res, next) {
        try {
            const { email } = req.body
            const userData = await userService.resetMail(email)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new userController()
