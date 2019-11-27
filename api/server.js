const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const server = express()
const authRouter = require('../data/auth/authRouter')
const postRouter = require('../data/posts/postRouter')
const messageRouter = require('../data/messages/messageRouter')

server.use(express.json())

server.use('/api/users', authRouter)
server.use('/api/posts', postRouter)
server.use('/api/messages', messageRouter)

// server.use('/',(req,res)=>{
//     res.send('<h1>The Server Is Up And Running</h1>')
// })

module.exports = server