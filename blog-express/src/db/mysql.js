const mysql = require('mysql')
const {MYSQL_CONF} = require('../conf/db')
const escape = mysql.escape

const conn = mysql.createConnection(MYSQL_CONF)

conn.connect()

conn.on('error', (err) => {
    console.log('mysql connect error:', err)
})

const exec = (sql) => {
    const promise = new Promise((resolve, reject) => {
        conn.query(sql, (err, data) => {
            if(err) {
                reject(err)
                return
            }
            resolve(data)
        })
    })
    return promise
}

module.exports = {
    exec,
    escape
}