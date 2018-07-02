#!/usr/bin/env node
'use strict'

const kill = require('./')
const args = require('get-them-args')(process.argv.slice(2))

const verbose = args.verbose || false

let port = args.port ? args.port.split(',') : args.unknown

if (!Array.isArray(port)) {
  port = [port]
}

Promise.all(port.map(current => {
  return kill(current)
    .then((result) => {
      console.log(`Process on port ${current} killed`)
      verbose && console.log(result)
    })
    .catch((error) => {
      console.log(`Could not kill process on port ${port}`)
      verbose && console.log(error)
    })
}))
