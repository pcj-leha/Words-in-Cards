const { Words } = require('../models/models')
const ApiError = require('../error/ApiError')

class wordController {
    async create(req, res, next) {
        try {
            let { name, term, definition, userId } = req.body
            const words = await Words.create({ name, term, definition, userId })
            return res.json(words)
        } catch (e) {
            next(ApiError.badrequest(e.message))
        }
    }

    async getAll(req, res) {
        try {
            let { userId, limit, page } = req.query
            page = page || 1
            limit = limit || 4
            let offset = page * limit - limit
            let word
            if (!userId) {
                word = await Words.findAndCountAll({ limit, offset })
            }
            if (userId) {
                word = await Words.findAndCountAll({
                    where: { userId },
                    limit,
                    offset,
                })
            }
            return res.json(word)
        } catch (e) {
            console.log(e)
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params
            const word = await Words.findOne({ where: { id: id } })
            return res.json(word)
        } catch (e) {
            console.log(e)
        }
    }

    async getUserWord(req, res) {
        try {
            const { id } = req.params
            const word = await Words.findAll({ where: { userId: id } })
            return res.json(word)
        } catch (e) {
            console.log(e)
        }
    }
}
module.exports = new wordController()
