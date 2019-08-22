const redis = require('redis')
const {REDIS_CONF} = require('../conf/db')

const client = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

client.on('error', (err) => {
    console.log('Redis Error:', err)
})

const get = (key) => {
    const promise = new Promise((resolve, reject) => {
        client.get(key, (err, reply) => {
            if(err) {
                reject(err)
                return
            }
            if(reply === null) {
                resolve(null)
                return
            }
            try {
                resolve(JSON.parse(reply))
            }catch {
                resolve(reply)
            }
        })
    })
    return promise
}

const set = (key, value) => {
    if(typeof value === 'object') {
        client.set(key, JSON.stringify(value), redis.print)
        return
    }
    client.set(key, value, redis.print)
}

module.exports = {
    get,
    set
}