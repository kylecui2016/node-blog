const express = require('express')
const router = express.Router()
const {SuccessModel, ErrorModel} = require('../model/resModel')
const {login} = require('../controller/user')

router.post('/login', (req, res, next) => {
    const {username, password} = req.body

    if(!username || !password) {
        res.json(
            new ErrorModel('用户名和密码不能为空！')
        )
    }
    const result = login(username, password)
    result.then((data) => {
        if(data.username) {
            req.session.username = data.username
            req.session.realname = data.realname
            res.json(
                new SuccessModel()
            )
            return
        }
        res.json(
            new ErrorModel('登录失败！')
        )
    })
})

module.exports = router