const mysql = require('mysql')
const {MYSQL_CONF} = require('../conf/db')
const escape = mysql.escape

const connection = mysql.createConnection(MYSQL_CONF)

connection.connect()

const exec = (sql) => {
    const promise = new Promise((resolve, reject) => {
        connection.query(sql, (err, data) => {
            if(err) {
                reject(err)
            }else {
                resolve(data)
            }
        })
    })
    return promise
}

module.exports = {
    exec,
    escape
}