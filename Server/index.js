require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const sequelize = require('./db')
const router = require('./routs/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleWare')

const Port = process.env.PORT
const app = express()
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    })
)
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)

app.use(errorHandler) //обработчик ошибок в самом конце

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(Port, () => console.log('Server started on Port', Port))
    } catch (e) {
        console.log(e)
    }
}

start()
