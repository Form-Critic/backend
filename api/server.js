const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const server = express()
const userRouter = require('../data/auth/authRouter')

server.use(express.json())

server.use('/api/users', userRouter)

// server.use('/',(req,res)=>{
//     res.send('<h1>The Server Is Up And Running</h1>')
// })

module.exports = server