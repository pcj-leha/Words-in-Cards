const models = require('../models/models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailSevice = require('./mail-service')
const tokenService = require('./token-service')
const userDto = require('../dtos/user-dto')
const ApiError = require('../error/ApiError')

class userService {
    async registration(name, email, password, flag) {
        const candidate_name = await models.Users.findOne({
            where: { name: name },
        })
        const candidate_email = await models.Users.findOne({
            where: { email: email },
        })
        if (candidate_email) {
            throw ApiError.badrequest(
                `пользователь с почтовым адресом ${email} уже существует!`
            )
        }

        if (candidate_name) {
            throw ApiError.badrequest(
                `пользователь с именем ${name} уже существует!`
            )
        }
        const hashPassword = await bcrypt.hash(
            password,
            parseInt(process.env.HASH_COUNT)
        )
        const activationLink = uuid.v4()

        const user = await models.Users.create({
            name,
            email,
            password: hashPassword,
            activationLink: activationLink,
            mailing_list: flag,
        })
        mailSevice.sendActivationMail(
            email,
            `${process.env.API_URL}/api/user/activate/${activationLink}`
        )

        const UserDto = new userDto(user)

        const tokens = tokenService.generateTokens({ ...UserDto })
        await tokenService.saveToken(UserDto.id, tokens.refreshToken)

        return { ...tokens, user: UserDto }
    }

    async activate(activationLink) {
        const user = await models.Users.findOne({
            where: { activationLink: activationLink },
        })
        if (!user) {
            throw ApiError.badrequest('Неккоректная ссылка!')
        }
        user.isActivated = true
        await user.save()
    }

    async login(email, password) {
        const user = await models.Users.findOne({ where: { email } })
        if (!user) {
            throw ApiError.badrequest(`Неверный логин или пароль!`)
        }

        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.badrequest(`Неверный логин или пароль!`)
        }

        const UserDto = new userDto(user)
        const tokens = tokenService.generateTokens({ ...UserDto })
        await tokenService.saveToken(UserDto.id, tokens.refreshToken)

        return { ...tokens, user: UserDto }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unAutorizade()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDB) {
            throw ApiError.unAutorizade()
        }
        const userId = userData.id
        const user = await models.Users.findOne({ where: { id: userId } })

        const UserDto = new userDto(user)
        const tokens = tokenService.generateTokens({ ...UserDto })

        await tokenService.saveToken(UserDto.id, tokens.refreshToken)
        return { ...tokens, user: UserDto }
    }

    async getAllUsers() {
        const users = await models.Users.findAll()
        return users
    }

    async getOneUser(id) {
        const user = await models.Users.findOne({ where: { id: id } })
        if (!user) {
            throw ApiError.badrequest(`Пользователь с именем ${id} не найден!`)
        }
        return user
    }

    async checkNameUser(name) {
        const user = await models.Users.findOne({ where: { name: name } })
        let check = true
        if (!user) {
            check = false
        }
        return check
    }

    async checkEmailUser(email) {
        const user = await models.Users.findOne({ where: { email: email } })
        let check = true
        if (!user) {
            check = false
        }
        return check
    }

    async reset(resetLink, password) {
        const user = await models.Users.findOne({
            where: { resetLink: resetLink },
        })
        if (!user) {
            throw ApiError.badrequest('Неккоректная ссылка!')
        }
        const hashPassword = await bcrypt.hash(
            password,
            parseInt(process.env.HASH_COUNT)
        )
        user.password = hashPassword
        user.resetLink = ''
        await user.save()
    }

    async resetMail(email) {
        const user = await models.Users.findOne({ where: { email: email } })
        if (!user) {
            throw ApiError.badrequest(
                `Пользователя с email: ${email} не существует!`
            )
        }
        const resetLink = uuid.v4()
        mailSevice.sendResetMail(
            email,
            `${process.env.CLIENT_URL}/reset/${resetLink}`
        )
        user.resetLink = resetLink
        await user.save()
    }
}

module.exports = new userService()
