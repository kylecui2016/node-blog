const express = require('express')
const router = express.Router()
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.get('/list', (req, res, next) => {
    let author = req.query.author
    const keyword = req.query.keyword

    if(req.query.isadmin) {
        if(!req.session.username) {
            res.json(
                new ErrorModel('未登录！')
            )
            return
        }
        author = req.session.username
    }

    const result = getList(author, keyword)
    result.then((data) => {
        res.json(
            new SuccessModel(data)
        )
    }).catch((err) => {
        res.json(
            new ErrorModel(err)
        )
    })
})

router.get('/detail', (req, res, next) => {
    const id = req.query.id
    const result = getDetail(id)

    result.then((data) => {
        res.json(
            new SuccessModel(data)
        )
    }).catch((err) => {
        res.json(
            new ErrorModel(err)
        )
    })
})

router.post('/new', loginCheck, (req, res, next) => {
    const title = req.body.title
    const content = req.body.content
    const author = req.session.username

    const result = newBlog(title, content, author)

    result.then((data) => {
        res.json(
            new SuccessModel(data)
        )
    }).catch((err) => {
        res.json(
            new ErrorModel(err)
        )
    })
})

router.post('/update', loginCheck, (req, res, next) => {
    const id = req.query.id
    const title = req.body.title
    const content = req.body.content

    const result = updateBlog(id, title, content)

    result.then((data) => {
        if(data) {
            res.json(
                new SuccessModel('更新成功！')
            )
        }else {
            res.json(
                new ErrorModel('更新失败！')
            )
        }
    }).catch((err) => {
        res.json(
            new ErrorModel(err)
        )
    })
})

router.post('/del', loginCheck, (req, res, next) => {
    const id = req.query.id
    const author = req.session.username
    const result = delBlog(id, author)

    result.then((data) => {
        if(data) {
            res.json(
                new SuccessModel('删除成功！')
            )
        }else {
            res.json(
                new ErrorModel('删除失败！')
            )
        }
    }).catch((err) => {
        res.json(
            new ErrorModel(err)
        )
    })
})

module.exports = router