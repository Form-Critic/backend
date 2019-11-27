const db = require('../dbConfig')

module.exports = {
    send,
    getConversation,
    getByUser,
    sendReply,
    getUsersConversations
}

async function send(id, body){
    //when creating a new message
    //user_one should always be assigned to the currently logged in user
    const conversationExists = await getConversation(id.user_one, id.user_two)
    console.log(conversationExists)
    if (!conversationExists[0]){
    const message_id = await db('messages').insert({user_one:id.user_one, user_two:id.user_two}).select('*').returning('*')
    return sendReply({...body, message_id: message_id[0], user_id: id.user_one}) 
}else{
    return sendReply({...body, message_id: conversationExists[0].id, user_id: id.user_one})
}
}

function getConversation(user_id, other_id){
    // for conversation thread\ --> checks to see if a conversation exists between current user and another
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

async function sendReply(body){
    //body must include post_id, user_id, text
    reply_id = await db('message_conversation').insert(body).select('*').returning('*')
    return getById(reply_id[0])
}

function getUsersConversations(id){
    //work on incorporating message_conversation 
    return db('messages as m')
    .join('users as u', 'm.user_one', 'u.id')
    .join('users as u2', 'm.user_two', 'u2.id')
    // .leftJoin('message_conversation as mc', 'm.id', 'mc.message_id')
    .where({user_one: id}).orWhere({user_two: id}).select('m.*', 'u.name','u2.name as other_user').returning('m.*', 'u.name','u2.name')

}
