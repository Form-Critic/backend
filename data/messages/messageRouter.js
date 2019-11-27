const messageDB = require('./messageModel')
const router = require('express').Router()
const restricted = require('../auth/restricted-middleware')

router.post('/user/:id', restricted, (req,res)=>{
    //where id is the user_two
    const messageUsers = {user_one:req.decodedJwt.sub, user_two: req.params.id}
    const body = {...req.body}
    messageDB.send(messageUsers,body)
    .then(message=>{
        //upon success will create a record of a conversation and add a message
        console.log(message)
        res.status(200).json(...message)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })

})

router.post('/:message_id', restricted, (req,res)=>{
    //will be used for replies!!!!! id => message id 
    const body = {...req.params, user_id:req.decodedJwt.sub, ...req.body}
    messageDB.sendReply(body)
    .then(reply=>{
        res.status(201).json(...reply)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })

})

router.get('/', restricted, (req,res)=>{
    //front end needs to organize this information
    const user_id = req.decodedJwt.sub
    messageDB.getUsersConversations(user_id)
    .then(conversations=>{
        res.status(200).json(conversations)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('')


//middleware may not be necessary 
async function conversationExists(req,res,next){
    const messageUsers = {user_one:req.decodedJwt.sub, user_two: req.params.id}
    const conversation = await messageDB.getConversation(messageUsers.user_one, messageUsers.user_two)
    console.log('this one ', conversation)
}

module.exports = router