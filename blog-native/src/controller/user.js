const {exec, escape} = require('../db/mysql')
const xss = require('xss')
const {genPassword} = require('../util/crypto')

const login = (username, password) => {
    username = xss(escape(username))
    password = genPassword(password)
    console.log(password)
    password = xss(escape(password))
    const sql = `
        select username, realname 
        from users 
        where username=${username} and password=${password}
    `
    
    return exec(sql).then((loginData) => {
        return loginData[0] || {}
    })
}

module.exports = {
    login
}