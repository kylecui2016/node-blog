const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model')

const loginCheck = (req) => {
    if(!req.session.username) {
        return Promise.resolve(new ErrorModel('尚未登录！'))
    }
}

const blogHandleRouter = (req, res) => {

    const method = req.method
    const id = req.query.id
    req.body.author = 'zhangsan' //假数据，登录后处理

    if(method === 'GET' && req.path === '/api/blog/list') {
        
        let author = req.query.author
        const keyword = req.query.keyword
        if(req.query.isadmin) {
            author = req.session.username
        }
        const result = getList(author, keyword)
        
        return result.then((listData) => {
            return new SuccessModel(listData)
        })
    }

    if(method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail(id)
        return result.then((detailData) => {
            return new SuccessModel(detailData)
        })
    }

    if(method === 'POST' && req.path === '/api/blog/new') {
        const loginResult = loginCheck(req)
        if(loginResult) {
            return loginResult
        }
        req.body.author = req.session.username

        const result = newBlog(req.body)
        return result.then((data) => {
            return new SuccessModel(data)
        })
    }

    if(method === 'POST' && req.path === '/api/blog/update') {
        const loginResult = loginCheck(req)
        if(loginResult) {
            return loginResult
        }

        const result = updateBlog(id, req.body)
        return result.then(val => {
            if(val) {
                return new SuccessModel()
            }else {
                return new ErrorModel('更新失败！')
            }
        })
    }

    if(method === 'POST' && req.path === '/api/blog/del') {
        const loginResult = loginCheck(req)
        if(loginResult) {
            return loginResult
        }

        const author = req.session.username
        const result = delBlog(id, author)
        return result.then((val) => {
            if(val) {
                return new SuccessModel()
            }else {
                return new ErrorModel('删除失败！')
            }
        })
    }
}

module.exports = blogHandleRouter