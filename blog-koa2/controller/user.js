const {
    exec,
    escape
} = require('../db/mysql')
const xss = require('xss')
const {genPassword} = require('../util/crypto')

const login = async (username, password) => {
    username = xss(escape(username))
    password = genPassword(password)
    password = xss(escape(password))
    const sql = `
        select username, realname from users 
        where username=${username} and password=${password}
    `

    const rows = await exec(sql)
    return rows[0] || {}
}

module.exports = {
    login
}