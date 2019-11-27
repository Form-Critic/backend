const messageDB = require('./messageModel')
const router = require('express').Router()
const restricted = require('../auth/restricted-middleware')

router.post('/:id', restricted, (req,res)=>{
    //where id is the receiver
    const messageUsers = {user_one:req.decodedJwt.sub, user_two: req.params.id}
    const body = {...req.body}
    messageDB.send(messageUsers,body)
    .then(count=>{
        console.log(count)
        res.status(200).json(count)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })

})

// router.get('/', restricted, (req,res)=>[

// ])

//middleware
async function conversationExists(req,res,next){
    const messageUsers = {user_one:req.decodedJwt.sub, user_two: req.params.id}
    const conversation = await messageDB.getConversation(messageUsers.user_one, messageUsers.user_two)
    console.log('this one ', conversation)
}

module.exports = router