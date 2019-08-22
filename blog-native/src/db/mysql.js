const mysql = require('mysql')
const {MYSQL_CONF} = require('../conf/db')
const escape = mysql.escape

const con = mysql.createConnection(MYSQL_CONF)

con.connect()

function exec(sql) {
    let promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if(err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec,
    escape
}