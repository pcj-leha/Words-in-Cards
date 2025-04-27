const Router = require('express')
const router = new Router()
const wordController = require('../controllers/wordController')
const authMiddleware = require('../middleware/auth-middleware')

//router.post(`/postWord`, authMiddleware, wordController.create)
router.post(`/postWord`, wordController.create)
router.get('/words', wordController.getAll)
router.get('/:id', wordController.getOne)
router.get('/user/:id', wordController.getUserWord)

module.exports = router
