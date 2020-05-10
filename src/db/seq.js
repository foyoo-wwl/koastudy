const Sequelize = require('sequelize')

const seq = new Sequelize('koa2_wb', 'root', 'zaijian4114', {
    host: "localhost",
    dialect: 'mysql'
})

module.exports = seq