const {exec, escape} = require('../db/mysql')
const xss = require('xss')

const getList = (author, keyword) => {

    let sql = `select * from blogs where 1=1 `

    if(author) {
        author = xss(escape(author))
        sql += `and author=${author} `
    }
    if(keyword) {
        keyword = xss(escape(keyword))
        sql += `and title like '%${keyword}%'`
    }
    return exec(sql)
}

const getDetail = (id) => {
    const sql = `select * from blogs where id=${id}`
    return exec(sql).then(rows => rows[0])
}

const newBlog = (postData) => {
    const title = xss(escape(postData.title))
    const content = xss(escape(postData.content))
    const createTime = Date.now()
    const author = xss(escape(postData.author))

    const sql = `
        insert into blogs(title, content, createtime, author) 
        values(${title}, ${content}, ${createTime}, ${author})
    `
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, postData) => {
    const title = xss(escape(postData.title))
    const content = xss(escape(postData.content))

    const sql = `
        update blogs set title=${title}, content=${content} where id=${id}
    `
    return exec(sql).then(updateData => {
        if(updateData.affectedRows > 0) {
            return true
        }else {
            return false
        }
    })
}

const delBlog = (id, author) => {
    author = xss(escape(author))
    const sql = `
        delete from blogs where id=${id} and author=${author}
    `

    return exec(sql).then((delData) => {
        if(delData.affectedRows > 0) {
            return true
        }else {
            return false
        }
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}