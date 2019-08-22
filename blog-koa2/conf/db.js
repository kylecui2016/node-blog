const env = process.env.NODE_ENV
let MYSQL_CONF = {}
let REDIS_CONF = {}

if(env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'chinaso@2019',
        database: 'myblog'
    }
    REDIS_CONF = {
        host: '127.0.0.1',
        port: 6379
    }
}else {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'chinaso@2019',
        database: 'myblog'
    }
    REDIS_CONF = {
        host: '127.0.0.1',
        port: 6379
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}