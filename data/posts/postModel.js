const db = require('../dbConfig')

module.exports = {
    add,
    getAll,
    getById,
    update,
    remove,
    getCompletePost
}

async function add(post){
    const newPostId = await db('posts').insert(post).select('*').returning('*')
    console.log(newPostId[0])
    return getCompletePost(newPostId[0])
}

function getAll(){
    //for the grid view!!
    return db('posts as p')
    .join('exercises as e', 'p.exercise_id', 'e.id')
    .join('users as u', 'u.id', 'p.user_id')
    .select('u.name as user', 'u.id as user_id', 'u.avatar','p.id', 'p.title', 'p.description','e.name','p.video_link', 'p.date', 'p.up_vote', 'p.down_vote')
    .returning('u.name as user', 'u.id as user_id', 'u.avatar','p.id', 'p.title', 'p.description','e.name','p.video_link', 'p.date', 'p.up_vote', 'p.down_vote')
}

async function update(id, post){
    //id is obj, post is obj
    const updated = await db('posts').update(post).where(id).select('*').returning('*')
    //returns obj in list
    return updated? getById(id) : 0
}

function getById(id){
    //id is obj
    return db('posts').where(id).select('*').returning('*')
}

async function remove(id){
    //id is int
    console.log(id)
    const deletedPost = await getById({id:id})
    await db('posts').where({id:id}).del()
    return deletedPost
} 

function getCompletePost(id){
    //id is int
    return db('posts as p')
    .join('users as u', 'u.id', 'p.user_id')
    .join('exercises as e', 'e.id', 'p.exercise_id')
    .where({'p.id':id})
    .select('u.username', 'u.avatar', 'u.name','p.*', 'e.name as exercise')
    // .select('p.*')
    .returning('u.username', 'u.avatar', 'u.name','p.*', 'e.name as exercise')
}
// function remove