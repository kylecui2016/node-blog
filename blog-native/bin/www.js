const serverHandle = require('../app')
const http = require('http')

const server = http.createServer(serverHandle)

server.listen(8000)
console.log('server is listening at 8000 ...')