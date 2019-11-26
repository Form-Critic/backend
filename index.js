require('dotenv').config();
const server = require('./api/server')

const PORT = process.env.PORT || 8080

server.listen(PORT, ()=>{
    console.log(`You are now tunned in on ${PORT}`)
})