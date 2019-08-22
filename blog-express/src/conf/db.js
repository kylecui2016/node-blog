let MYSQL_CONF
let REDIS_CONF

const env = process.env.NODE_ENV

if(env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'chinaso@2019',
        database: 'myblog'
    }
    REDIS_CONF = {
        port: '6379',
        host: '127.0.0.1'
    }
}else {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'chinaso@2019',
        database: 'myblog'
    }
    REDIS_CONF = {
        port: '6379',
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}