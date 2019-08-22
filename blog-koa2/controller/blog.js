const {exec, escape} = require('../db/mysql')
const xss = require('xss')

const getList = async (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if(author) {
        sql += `and author like '%${author}%' `
    }
    if(keyword) {
        sql += `and title like '%${keyword}%'`
    }
    const result = await exec(sql)
    return result
}

const getDetail = async (id) => {
    const sql = `select * from blogs where id=${id}`
    const rows = await exec(sql)

    return rows[0]
}

const newBlog = async (title, content, author) => {
    title = xss(escape(title))
    content = xss(escape(content))
    author = xss(escape(author))
    const createTime = Date.now()
    const sql = `
        insert into blogs(title, content, createtime, author)
        values(${title}, ${content}, ${createTime}, ${author})
    `

    const insertData = await exec(sql)

    return {
        id: insertData.insertId
    }
}

const updateBlog = async (id, title, content) => {
    title = xss(escape(title))
    content = xss(escape(content))
    const sql = `
        update blogs set title=${title}, content=${content} where id=${id}
    `

    const updateData = await exec(sql)

    if(updateData.affectedRows > 0) {
        return true
    }else {
        return false
    }
}

const delBlog = async (id, author) => {
    author = xss(escape(author))
    const sql = `
        delete from blogs where id=${id} and author=${author}
    `

    const delData = await exec(sql)

    if(delData.affectedRows > 0) {
        return true
    }else {
        return false
    }
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}