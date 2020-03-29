const express = require('express')
const session = require('express-session')

// USING OBJECT DESTRUCTURING SYNTAX
const {
  PORT = 3000
} = process.env

const app = express()


app.listen('/', PORT, console.log(`Server started at port ${PORT}`));