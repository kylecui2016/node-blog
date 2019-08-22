const router = require('koa-router')()
const {
    login
} = require('../controller/user')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
    const username = ctx.request.body.username
    const password = ctx.request.body.password

    try {
        const result = await login(username, password)
        if(result.username) {
            ctx.session.username = result.username
            ctx.session.realname = result.realname
            ctx.body = new SuccessModel('登录成功！')
        }else {
            ctx.body = new ErrorModel('登录失败！')
        }
    }catch (err) {
        ctx.body = new ErrorModel(err)
    }
})

module.exports = router