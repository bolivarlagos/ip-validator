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

if(process.argv.length > 3){
    console.log()
}

if(!arg){
    console.log()
} else if(arg === '--help'){
    console.log()
} else {
    console.log()
}

