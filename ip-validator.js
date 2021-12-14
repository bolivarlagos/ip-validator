#!/usr/bin/env node

const fs = require('fs')
const EventEmitter = require('events')

const fileRegex = /\s+|\n/
const ipv4Regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
const ipv6Regex = /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/

const customEmitter = new EventEmitter()

const arg = process.argv[2]
const ip4FileName = 'ip4.txt'
const ip6FileName = 'ip6.txt'

const handleExit = (...emiterArgs) => {
    switch(emiterArgs[0]){
        case 'exceed':
            console.log('Too many arguments')
            console.log('Try ip-validator --help')
            break
        case 'no-file':
            console.log('No file was provided')
            console.log('Try ip-validator --help')
            break          
        case 'help':
            console.log('Usage:')
            console.log('ip-validator <fileName>')
            console.log('eg: ip-validator ipList.txt')
            break   
        case 'error':
            console.log('Error', emiterArgs[1]) 
            break 
        default:
            console.log('Not expected')
            break     
    }
    process.exit(true)
}

const handleSuccess = (...successArgs) => {
    switch(successArgs[0]){
        case 'read':
            console.log('Just finished reading')
            break
        case 'write':
            console.log('Just finished write file ')
            break 
        default:
            console.log('Not expected')
            break
    }
}

customEmitter.on('exit', handleExit)
customEmitter.on('success', handleSuccess)

if(process.argv.length > 3){
    customEmitter.emit('exit', 'exceed')
}
if(!arg){
    customEmitter.emit('exit', 'no-file')
} else if(arg === '--help'){
    customEmitter.emit('exit', 'help')
} else {
    const file = `${__dirname}/${arg}`
    let allIpv4 = 'List of all the ipv4:\n'
    let allIpv6 = 'List of all the ipv6:\n'

    fs.readFile(file, (err, data) => {
        if(err){
            customEmitter.emit('exit', 'error', err)
        }
        const wordCollection = data.toString().split(fileRegex)
        wordCollection.forEach(item => {
            if(item.match(ipv4Regex)){
                allIpv4 += item + '\n'
                return 
            }
            if(item.match(ipv6Regex)){
                allIpv6 += item + '\n'
                return 
            }
        })
        customEmitter.emit('success', 'read')
        fs.writeFile(ip4FileName, allIpv4, (err) => {
            if(err){
                customEmitter.emit('exit', 'error', err)
            }
            customEmitter.emit('success', 'write')
        })
        fs.writeFile(ip6FileName, allIpv6, (err) => {
            if(err){
                customEmitter.emit('exit', 'error', err)
            }
            customEmitter.emit('success', 'write')
        })
    })
}

