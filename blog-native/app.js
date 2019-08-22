const querystring = require('querystring')
const blogHandleRouter = require('./src/router/blog')
const userHandleRouter = require('./src/router/user')
const {get} = require('./src/db/redis')
const {access} = require('./src/util/log')

const getExpireTime = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

const getPostData = (req, res) => {
    const promise = new Promise((resolve, reject) => {
        if(req.method !== 'POST') {
            resolve({})
            return
        }
        if(req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if(!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })

    return promise
}

const serverHandle = (req, res) => {
    const url = req.url
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])

    res.setHeader('Content-type', 'application/json')

    // 访问日志
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach((item) => {
        if(!item) {
            return
        }
        let arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })

    // 解析session
    let userId = req.cookie.userid
    let needSetCookie = false
    if(!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
    }

    req.sessionId = userId
    get(req.sessionId).then((sessionData) => {
        req.session = sessionData || {}
        return getPostData(req)
    }).then((postData) => {
        
        req.body = postData

        const blogResult = blogHandleRouter(req, res)
        const userResult = userHandleRouter(req, res)

        if(blogResult) {
            blogResult.then((blogData) => {
                if(needSetCookie) {
                    res.setHeader('Set-Cookie', ` userid=${userId}; path=/; HttpOnly; expires=${getExpireTime()}`)
                }
                res.end(JSON.stringify(blogData))
            })
            return
        }

        if(userResult) {
            userResult.then((userData) => {
                if(needSetCookie) {
                    res.setHeader('Set-Cookie', ` userid=${userId}; path=/; HttpOnly; expires=${getExpireTime()}`)
                }
                res.end(JSON.stringify(userData))
            })
            return
        }

        res.writeHead(404, 'text/plain')
        res.write('404 Not Found!')
        res.end()
    })

    
}

module.exports = serverHandle