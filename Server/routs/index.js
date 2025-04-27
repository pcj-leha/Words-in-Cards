const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const wordRouter = require('./wordRouter')

router.use('/user', userRouter)
router.use('/word', wordRouter)

module.exports = router