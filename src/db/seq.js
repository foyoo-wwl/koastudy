/* eslint-disable eol-last */
/**
 * @description sequelize实例
 */


const Sequelize = require('sequelize')
const {
    MYSQL_CONF,
} = require('../conf/db')

const {
    host,
    user,
    database,
    password,
} = MYSQL_CONF
// const {
//     isTest,
// } = require('../utils/env')

const conf = {
    host,
    dialect: 'mysql',
}


// if (isTest) {
//     conf.loging = () => {}
// }

const seq = new Sequelize(database, user, password, conf)

module.exports = seq