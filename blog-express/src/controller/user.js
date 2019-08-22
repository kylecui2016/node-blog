const {genPassword} = require('../util/crypto')
const {exec, escape} = require('../db/mysql')
const xss = require('xss')

const login = (username, password) => {
    username = xss(escape(username))
    password = genPassword(password)
    password = xss(escape(password))
    
    const sql = `
        select username, realname from users 
        where username=${username} and password=${password}
    `

    return exec(sql).then((rows) => {
        return rows[0] || {}
    })
}

module.exports = {
    login
}