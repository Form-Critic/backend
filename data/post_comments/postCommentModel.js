const db = require('../dbConfig')

module.exports = {
    add,
    getById,
    getAll,
    update,
    remove,
    getByCommentId
}

async function add(comment){
    const commentId = await db('post_comments as p').insert(comment).select('p.id').returning('p.*')
    console.log(commentId)
    return getByCommentId(commentId[0])
}

function getById(id){
    //id is int
    return db('post_comments as pc')
    .join('users as u', 'u.id','pc.user_id')
    .where({'pc.post_id': id})
    .select('pc.*', 'u.name', 'u.username', 'u.avatar')
    .returning('pc.*', 'u.name', 'u.username', 'u.avatar')
    //.where({post_id:id}).select('*').returning('*')
}

function getAll(){
    // add a way to sort them by date
    return db('post_comments').select('*').returning('*')
}

async function update(id, comment){
    //id is obj, post is obj
    const updated = await db('post_comments').update(comment).where(id).select('*').returning('*')
    //returns obj in list
    console.log('line 32 ',updated )
    const newId = id.id
    return updated? getByCommentId(newId) : 0
}

async function remove(id){
    //id is int
    console.log(id)
    const deletedPost = await getByCommentId(id)
    await db('post_comments').where({id:id}).del()
    return deletedPost
} 

function getByCommentId(id){
    //id is int
    return db('post_comments as pc')
    .join('users as u', 'u.id','pc.user_id')
    .where({'pc.id': id})
    .select('pc.*', 'u.name', 'u.username', 'u.avatar')
    .returning('pc.*', 'u.name', 'u.username', 'u.avatar')
}