const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log')
const readStream = fs.createReadStream(fileName)

const rl = readline.createInterface({
    input: readStream
})

let chromeSum = 0
let sum = 0

rl.on('line', (lineData) => {
    if(!lineData) {
        return
    }
    sum ++

    let arr = lineData.split(' -- ')
    if(arr[2] && arr[2].includes('Chrome')) {
        chromeSum ++
    }
})

rl.on('close', () => {
    console.log('chrome 占比：', chromeSum/sum)
})