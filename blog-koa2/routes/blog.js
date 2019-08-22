const router = require('koa-router')()
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')
const {loginCheck} = require('../middleware/loginCheck') 

// 请求完成后一定要给前端一个响应（设置ctx.body），否则前端会报404错误，但接口逻辑成功

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
    let author = ctx.query.author
    let keyword = ctx.query.keyword

    if(ctx.query.isadmin) {
        if(!ctx.session.username) {
            ctx.body = new ErrorModel('未登录！')
            return
        }
        author = ctx.session.username
    }

    try {
        const result = await getList(author, keyword)
        ctx.body = new SuccessModel(result)
    } catch (err) {
        ctx.body = new ErrorModel(err)
    }
})

router.get('/detail', async (ctx, next) => {
    const id = ctx.query.id

    try {
        const result = await getDetail(id)
        ctx.body = new SuccessModel(result)
    } catch (err) {
        ctx.body = new ErrorModel(err)
    }
})

router.post('/new', loginCheck, async (ctx, next) => {
    const title = ctx.request.body.title
    const content = ctx.request.body.content
    const author = ctx.session.username

    try {
        const result = await newBlog(title, content, author)
        ctx.body = new SuccessModel(result)
    }catch (err) {
        ctx.body = new ErrorModel(result)
    }
})

router.post('/update', loginCheck, async (ctx, next) => {
    const id = ctx.query.id
    const title = ctx.request.body.title
    const content = ctx.request.body.content

    try {
        const result = await updateBlog(id, title, content)
        if(result) {
            ctx.body = new SuccessModel('更新成功！')
        }else {
            ctx.body = new ErrorModel('更新失败！')
        }
    }catch (err) {
        ctx.body = new ErrorModel(result)
    }
})

router.post('/del', loginCheck, async (ctx, next) => {
    const id = ctx.query.id
    const author = ctx.session.username

    try {
        const result = await delBlog(id, author)
        if(result) {
            ctx.body = new SuccessModel('删除成功！')
        }else {
            ctx.body = new ErrorModel('删除失败！')
        }
    }catch (err) {
        ctx.body = new ErrorModel(err)
    } 
})

module.exports = router