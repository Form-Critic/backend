const db = require('../dbConfig')

module.exports = {
    send,
    getConversation,
    getByUser
}

async function send(id, body){
    //when creating a new message
    //user_one should always be assigned to the currently logged in user
    const conversationExists = await getConversation(id.user_one, id.user_two)
    console.log('is this defined', !conversationExists[0])
    if (!conversationExists[0]){
        console.log('this is read')
    const message_id = await db('messages').insert({user_one:id.user_one, user_two:id.user_two}).select('*').returning('*')
    console.log('this needs to hit', message_id)
    const reply_id = await sendReply({...body, message_id: message_id[0], user_id: id.user_one})
    return getById(reply[0])
}else{
    const reply_id = await sendReply({...body, message_id: conversationExists[0].id, user_id: id.user_one})
    console.log(reply_id)
    return getById(reply_id[0])
}
}

function getConversation(user_id, other_id){
    // for conversation thread\
    return db('messages').where({user_one: user_id}).andWhere({user_two:other_id}).orWhere({user_one: other_id}).andWhere({user_two:user_id}).select('*').returning('*')
}

function getByUser(id){
    //this displays all the messages for a user --> id is the current users
    return db('messages').where({user_one: id}).orWhere({user_two:id}).select('*').returning('*')
}

function getById(id){
    //id ==> message id
    return db('message_conversation').where({id:id})
}

function sendReply(body){
    //body must include post_id, user_id, text
    return db('message_conversation').insert(body).select('*').returning('*')
}