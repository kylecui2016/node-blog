const crypto = require('crypto')
const SECRET_KEY = 'chinaso_2014@'

const md5 = (content) => {
    const hash = crypto.createHash('md5')
    return hash.update(content).digest('hex')
}

const genPassword = (password) => {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}

module.exports = {
    genPassword
}