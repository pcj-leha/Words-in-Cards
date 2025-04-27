const sequelize = require('../db')
const DataTypes = require('sequelize')

const Users = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
    activationLink: { type: DataTypes.STRING },
    mailing_list: { type: DataTypes.BOOLEAN, defaultValue: false },
    resetLink: { type: DataTypes.STRING },
})

const Words = sequelize.define('word', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    term: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: false },
    definition: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: false },
})

const TokenSchema = sequelize.define('token', {
    refreshToken: { type: DataTypes.STRING, allowNull: false },
})

Users.hasMany(Words)
Words.belongsTo(Users)

Users.hasOne(TokenSchema)
TokenSchema.belongsTo(Users)

module.exports = {
    Users,
    Words,
    TokenSchema,
}
