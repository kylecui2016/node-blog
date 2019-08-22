const fs = require('fs')
const path = require('path')

const writeStream = (fileName) => {
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
    const stream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return stream
}

const writeLog = (stream, log) => {
    stream.write(log + '\n')
}

const accessWriteSteam = writeStream('access.log')

const access = (log) => {
    writeLog(accessWriteSteam, log)
}

module.exports = {
    access
}
