const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model')
const {set} = require('../db/redis')

const userHandleRouter = (req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]

    if(method === 'POST' && path === '/api/user/login') {
        const {username, password} = req.body
        const result = login(username, password)
        return result.then((data) => {
            if(data.username) {
                const obj = {
                    username: data.username,
                    realname: data.realname
                }
                set(req.sessionId, obj)
                return new SuccessModel('登录成功！')
            }
            return new ErrorModel('登录失败！')
        })
        
    }
}

module.exports = userHandleRouter